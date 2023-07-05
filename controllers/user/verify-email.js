const User = require('../../models/User');



const verifyMail = async(req, res)=>{

    const { email, token } = req.body

    const userExists = await User.findOne({email: email, verificationToken: token});
    if(!userExists)return res.status(400).json({
        success: false,
        message: 'User does not exist'
    });

    if(userExists.verificationTokenTTL <= Date.now()){
        return res.status(400).json({
            success: false,
            message: `verification-token provided expired for, ${userExists.email}`
          })
    };
    
    try {
        
        await userExists.updateOne({id: userExists.id}).set({
            verificationToken: '',
            verificationTokenTTL: '',
            accountVerified: true
        });

        const token = userExists.generateToken();

        return res.status(200).json({
            success: true,
            message: 'user email verified successfully',
            accessToken: token
        })

    } catch (error) {
        console.log("user-verify-email-error:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong-user verify-email'
        })
    }

};




module.exports = verifyMail