
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        price: {
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

module.exports = mongoose.model('Product', productSchema);