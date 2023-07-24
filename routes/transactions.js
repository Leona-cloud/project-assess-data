const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');



const makePayment = require('../controllers/transactions/make-payment');
const paystackWebhook = require('../webhook/paystack');


router.post('/make-payment', auth, makePayment);
router.post('/paystack-webhook', paystackWebhook);




module.exports = router;