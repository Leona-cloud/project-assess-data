const User = require('../../models/User');
const Transaction = require('../../models/Transaction');
const initializeTransaction = require('../../utils/initializeTransaction');
const crypto = require('crypto');


const makePayment = async (req, res)=>{

    const authenticatedUser = req.user;

    const user = await User.findOne({email: authenticatedUser.email});
    if(!user){
        return errorResponse(400, res, 'User not registerd')
    };

    const email = req.user.email;

    const amount = 1000
 
    const newAmount = Number((amount) * 100)

    const userData = { email, amount, date: Date.now() };

    const encryptUserData = crypto
    .createHash("sha256")
    .update(JSON.stringify(userData))
    .digest("hex");

    const transactionRefernce = encryptUserData.substring(0,7).toLocaleUpperCase();

    try {
        
        const makeFullPayment = await initializeTransaction(email, newAmount, transactionRefernce);
        if(!makeFullPayment) return errorResponse(400, res, 'Transaction unsuccessful, something went wrong');

        await Transaction.create({
            userId: req.user.id,
            transactionReference: transactionRefernce,
            amount,
            currency: 'NGN',
            narration: `Payment for data access`,
            depositorName: user.firstName + "  " + user.otherNames
        });

        return res.status(200).json({
            success: true,
            message: 'transaction initializied successfully',
            initializationUrl: `${makeFullPayment.data.authorization_url}`
        })

    } catch (error) {
        if(error.response){
            console.log("paystack-initialize-transaction-api-error", error.response.data);
        }
        console.log("paystack-initialize-transaction-internal-error", error.message);
        return null;
    }    
   
};





module.exports = makePayment;