const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const registerUser = require('../controllers/user/register');
const userLogin = require('../controllers/user/login');
const verifyMail = require('../controllers/user/verify-email');
const resetPassword = require('../controllers/user/reset-password');
const updatePassword = require('../controllers/user/update-password')



//user registration
router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/verify-email', verifyMail);
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword)






module.exports = router