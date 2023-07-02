const User = require('../../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {loginSchema} = require('../../schema/user-schema');



const userLogin = async(req, res)=>{


    const { error } = loginSchema(req.body);
    if (error) {
        return res.status(400).json({ message: [error.message.split(". ")] });
    };

    const {email, password } = req.body

    let userExists = await User.findOne({email});
    if(!userExists) return res.status(400).json({success: false, message: `user with ${email} does not exist`});

    try {
        const validPassword = await bcrypt.compare(password, userExists.password);
        if(!validPassword) return res.status(400).json({success: false, message: "Invalid email or password"});

        // access token
        const token = userExists.generateToken();

        return res.status(200).json({
            success: true,
            message: 'user logged in successfully',
            accessToken: token
        })
    } catch (error) {
        console.log("user-login-error:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong-user login'
        })
    }

};




module.exports = userLogin