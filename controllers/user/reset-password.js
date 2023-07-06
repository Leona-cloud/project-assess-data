const User = require('../../models/User');
const generateToken = require('../../utils/generate-token');
const sendEmail = require('../../utils/send-email');

const resetPassword = async(req, res)=>{

    const { email} = req.body;

    const userExists = await User.findOne({email: email});
    if(!userExists) return res.status(400).json({
        success: false,
        message: `user with ${email} does not exists`
    });

    try {
        //send otp
    const {token, expiresAt} = await generateToken(10);
    console.log(token)
    const emailSent = await sendEmail(token, userExists.email);
    if (!emailSent) {
      console.log(`reset-token otp email failed ${userExists.email}`);
    };
    
    await userExists.updateOne({id: userExists.id}).set({
             verificationToken: token,
            verificationTokenTTL: expiresAt
    });

    return res.status(200).json({
        success: true,
        message: `reset-password email sent to ${email}, successfully`
    });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong - reset password'
        })
    }



};



module.exports = resetPassword