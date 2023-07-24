const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');



const makePayment = require('../controllers/transactions/make-payment');


router.post('/make-payment', auth, makePayment);




module.exports = router;