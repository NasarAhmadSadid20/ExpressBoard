const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "اسم شما باید از 3 حرف بیشتر باشد "],
      maxLength: [50,"اسم شما باید از 50 حرف کمتر باشد "],
      required: true
    },
    email: {
      type: String,
      minLength: [3,"ایمیل شما باید از 3 حرف بیشتر باشد "],
      maxLength: [100,"ایمیل شما باید از 100 حرف کمتر باشد "],
      unique: [true,"ایمیل شما قبلن ثبت شده است"],
      required: true,
    },
    phone: {
      type: Number,
      minLength: [10,"شماره تلفن شما باید حدقل 10 عدد باشد"],
      maxLength: [14,"شماره تلفن شما باید از 14 عدد کمتر باشد"],
      unique: [true,"نمبر تلفن شما قبل ثبت شده است"],
      required: true,
    },
    password: {
      type: String,
      minLength: [7,"رمز شما باید از 7 حرف بیشتر باشد"],
      maxLength: [120,"رمز شما باید از 120 حرف بیشتر نباشد"],
      required:true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('user-ramadan' , userSchema)