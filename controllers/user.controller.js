const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/user.models");
const postModel = require('../models/post.model')


// register
const register = async (req, res) => {
  const { email, phone, name, password } = req.body;

  const foundUser = await userModel.findOne({ $or: [{ email }, { phone }] });
  if (foundUser) {
    return res.json("کاربر از قبل وجود دارد ! ");
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const newUser = await userModel.create({
        email,
        name,
        phone,
        password: hash,
      });
    });
    let token = jwt.sign(
      { email: email, userId: userModel._id },
      process.env.PRIMARY_KEY
    );
    res.cookie("token", token);
    res.json({ msg: "Your register went succesfully" });
  });
};


// login
const login = async (req, res) => {
  let errors =[]
  const { email, password } = req.body;
  const foundUser = await userModel.findOne({ $or: [{ email }] });
  if (foundUser) {
    const PasswordisCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (PasswordisCorrect) {
      let token = jwt.sign(
        { _id: foundUser._id, email: foundUser.email },
        process.env.PRIMARY_KEY
      );
      res.cookie("token", token);
      res.json({ msg: "your login went succsefuly" });
    } else res.json({ msg: "your password is not match" });
  } else {
    errors.push({msg: "شما در داخل دیتابیس ثبت نشده اید !"})
    res.render("login",{ errors});
  }
}; 

// logout
const logout = (req, res) => {
  res.cookie("token", "");
  res.json({ msg: "token went remove" });
};


// getLogin
const getLogin = (req, res) => {
  res.render("login");
};


// // profile
// const profile = (req, res) => {
//   res.render('profile')
// };
// post

const profile  = async (req,res)=>{
  let user = await  userModel.findOne({email : req.user.email})
  if(user){
    const {title, content} = req.body;
  }
  res.render('mypost')
}


module.exports = { register, login, logout, getLogin, profile };
