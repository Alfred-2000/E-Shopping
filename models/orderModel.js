
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        _id : {
            type : String
        },
        order_status : {
            type : String,
            required : true
        },
        product_id : {
            type : String
        },
        user_id : {
            type : String
        },
        created_at : {
            type : Date,
            default : Date.now
        },
        updated_at : {
            type : Date,
            required : false
        }
    }
)

module.exports = mongoose.model('Order', orderSchema);