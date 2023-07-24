const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    metaData: {
        type: Object
    },

    transactionReference: {
        type: String,
        required: true,
        unique: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentChannel: {
        type: String,
        enum: ['card', 'Bank']
    },

    currency: {
        type: String,
        required: true,
        enum: ['NGN'],
        default: 'NGN'
    },

    status: {
        type: String,
        required: true,
        enum: ['processing', 'success', 'failed'],
        default: 'processing'
    },

    narration:{
        type: String,
    },

    depositorName: {
        type: String
    },


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },

    
}, {timestamps: true});


const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = Transaction;