const User = require('../../models/User');
const {registerSchema} = require('../../schema/user-schema');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const sendEmail = require('../../utils/send-email');
const generateToken = require('../../utils/generate-token')

const registerUser = async(req, res)=>{

    const { error } = registerSchema(req.body);
    if (error) {
        return res.status(400).json({ message: [error.message.split(". ")] });
    };


    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).json({success: false, message: `user with ${req.body.email} already exist`});


    user = new User(_.pick(req.body, ['email', 'firstName', 'otherNames', 'password', 'address']));

    try {
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const result = await user.save();
        console.log(result, 'user registration');

        //send email
        const { token, expiresAt } = await generateToken(10);
        console.log(expiresAt)
        const emailSent = await sendEmail(token, user.email);
        if (!emailSent) {
          console.log(`verification email failed ${user.email}`);
        };

        await user.updateOne({id: user.id}).set({
            verificationToken: token,
            verificationTokenTTL: expiresAt
        });

        return res.status(200).json({
            success: true,
            message: 'user registered successfully'
        });

        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong - user registration'
        })
    }

};


module.exports = registerUser