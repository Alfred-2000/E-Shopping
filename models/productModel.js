
const mongoose = require('mongoose');
const UUID = require('uuid');

const productSchema = new mongoose.Schema(
    {
        _id : {
            type : String,
            default : UUID.v4()
        },
        name : {
            type : String,
            required : true
        },
        description : {
            type : String
        },
        price : {
            type : Number,
            required : true
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

module.exports = mongoose.model('Product', productSchema);