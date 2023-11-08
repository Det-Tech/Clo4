var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user_id: {
        type: String,
    },

    amount: {
        type: String,
    },

    transaction: {
        type: String,
    },

    status: {   // 0: pending, 1: confirm, 2: refund
        type: Number
    },

    created_at: {
        type: Date,
        required: true
    },
})


module.exports = mongoose.model('Payment', PaymentSchema);