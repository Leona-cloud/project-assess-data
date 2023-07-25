const Transaction = require('../../models/Transaction');


const fetchTransaction = async(req, res)=>{

    const user = req.user

    try {
        const transactionHistory  = await Transaction.find({userId: user.id}).sort({createdAt: 1});
        return res.status(200).json({
            success: true,
            message: 'Transactions fetched successfully',
            transactionHistory
        })

    } catch (error) {
        console.log("Transaction-history", error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong-transaction history'
        })
    }
   

};



module.exports = fetchTransaction