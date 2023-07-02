const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const registerUser = require('../controllers/user/register');
const userLogin = require('../controllers/user/login');




//user registration
router.post('/register', registerUser);
router.post('/login', userLogin)






module.exports = router