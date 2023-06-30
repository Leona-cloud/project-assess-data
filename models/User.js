const mongoose = require('mongoose');
const PasswordComplexity = require("joi-password-complexity");


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    otherNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: new PasswordComplexity({
        min: 8,
        max: 25,
        lowercase: 1,
        uppercase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    }),
    address: {
        type: String,
        required: true
    }

});


const User = mongoose.model('User', userSchema);


module.exports = User