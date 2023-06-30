const User = require('../../models/User');
const {registerSchema} = require('../../schema/user-schema');
const bcrypt = require('bcrypt');
const _ = require('lodash')

const registerUser = async(req, res)=>{

    const { error } = registerSchema(req.body);
    if (error) {
        return res.status(400).json({ message: [error.message.split(". ")] });
    };


    let user = await User.findOne({email: req});
    if(user) return res.status(400).json({success: false, message: `user with ${req.body.email}`});


    user = new User(_.pick(req.body, ['email', 'firstName', 'otherNames', 'password', 'address']));

    try {
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);

        const result = await user.save();
        console.log(result, 'user registration');

        return res.status(200).json({
            success: true,
            message: 'user registered successfully'
        });

    } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'Student registration failed')
    }

};


module.exports = registerUser