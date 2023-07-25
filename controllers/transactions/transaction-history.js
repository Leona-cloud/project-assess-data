const Transaction = require('../../models/Transaction');


const fetchTransaction = async(req, res)=>{


    try {
        const transactionHistory  = await Transaction.find().sort({createdAt: 1});
        return res.status(200).json({
            success: true,
            message: 'Transactions fetched successfully',
            transactionHistory
        })

    } catch (error) {
        console.log("Transaction-history", error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong-user login'
        })
    }
   

};



module.exports = fetchTransaction