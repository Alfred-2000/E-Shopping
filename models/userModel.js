
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        username: {
            type: String,
            required: true,
            maxLength: 150
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxLength: 256
        },
        phone_code: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
            unique: true
        },
        is_superuser: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            required: false
        },
    }
);

module.exports = mongoose.model('User', userSchema);
