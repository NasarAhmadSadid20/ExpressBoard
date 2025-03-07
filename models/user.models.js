const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,

    },
    email: {
        type: String,
        minLength: 3,
        maxLength: 100,
        unique: true
    },
    phone: {
        type: Number,
        minLength: 10,
        maxLength: 12,
        unique: true
    },
    password: {
        type: String,
        minLength: 7,
        maxLength: 120
    }

},{timestamps: true})
module.exports = mongoose.model('user-ramadan' , userSchema)