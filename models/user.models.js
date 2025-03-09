const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: [true, "name is not there ! "],
    },
    email: {
      type: String,
      minLength: 3,
      maxLength: 100,
      unique: true,
      required: [true, "email is not there ! "],
    },
    phone: {
      type: Number,
      minLength: 10,
      maxLength: 12,
      unique: true,
      required: [true, "phone is not there ! "],
    },
    password: {
      type: String,
      minLength: 7,
      maxLength: 120,
      required: [true, "password is not there ! "],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('user-ramadan' , userSchema)