const axios = require("axios");

const initializeTransaction = async function(email, amount, reference){
    const Token = "sk_test_7538b2d80a4f4f8ed1ffe5795971c0ebed08b76c";

    try {

        const res  = await axios({
            method: 'POST',
            url: `${process.env.paystackUrl}/transaction/initialize`,
            data: {
                email: email,
                amount: amount,
                channels: ['card', 'Bank'],
                reference: reference

            },
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Token}`
            }
        });

        console.log('paystack-initialize-transaction', res.data);
        return res.data
        
    } catch (error) {
        if(error.response){
            console.log("paystack-initialize-transaction-api-error", error.response.data);
        }
        console.log("paystack-initialize-transaction-internal-error", error.message);
        return null;
    }


};




module.exports = initializeTransaction