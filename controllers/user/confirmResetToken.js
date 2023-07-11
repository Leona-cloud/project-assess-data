const User = require('../../models/User');

const resetToken = async (req, res)=>{

    const {email, token} = req.body;

    const userExists = await User.findOne({email: email, verificationToken: token});
    if(!userExists) return res.status(400).json({
        success: false,
        message: 'Token invalid'
    });

    if(userExists.verificationTokenTTL <= Date.now()){
        return res.status(400).json({
            success: false,
            message: `OTP provided expired for, ${userExists.email}`
          })
    };


    try {
        await userExists.updateOne({id: userExists.id}).set({
            verificationToken: '',
            verificationTokenTTL: ''
        });

        return res.status(200).json({
            success: true,
            message: 'Token confirmed successfully'
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong - update password'
        })
    }



};



module.exports = resetToken