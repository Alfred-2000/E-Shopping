
const mongoose = require('mongoose');
const {ORDER_STATUS} = require('../constants');

const orderSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        order_status: {
            type: String,
            default: ORDER_STATUS[0]
        },
        product_id: {
            type: String,
            required: true
        },
        product_amount: {
            type: Number,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        order_amount: {
            type: Number,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            required: false
        }
    }
)

module.exports = mongoose.model('Order', orderSchema);