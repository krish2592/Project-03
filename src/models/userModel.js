const mongoose = require('mongoose');
const { isValidEmail, isValidPassword } = require('../utilities/validator');

let userSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, enum: ["Mr", "Mrs", "Miss"] },
        name: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true, validate:isValidEmail },
        password: { type: String, required: true,validate:isValidPassword, minlength: 8, maxlength: 15 },
        address: {
            street: { type: String },
            city: { type: String },
            pincode: { type: String }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);