const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userModel = require('../models/user.models')


// hash password 
async function cryptPassword(password){
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
   return hash
}
    
// profile
router.get('/profile',inLoggedin, (req,res)=>{
  res.json(req.user)

})
// register users
      
router.post('/register', async (req,res)=>{
   const {email, phone} = req.body
   
   const foundUser =  await userModel.findOne({$or:[{email}, {phone}]})
   if(foundUser){
      return res.json('کاربر از قبل وجود دارد ! ')
   }
    req.body.password = await cryptPassword(req.body.password);
      const newUser = new userModel(req.body);
      await newUser.save(); 
      const token = jwt.sign(
        { _id: newUser._id, email: newUser.email },
        process.env.PRIMARY_KEY
      );
      res.cookie("token",token)
      res.json({msg: 'Your register went succesfully'})
      

})   
   
// login users
router.post('/login',async(req,res)=>{
 const {email, phone , password} = req.body
 const foundUser = await userModel.findOne({$or:[{email}, {phone}]})
  if(foundUser){
  const PasswordisCorrect = await bcrypt.compare(password , foundUser.password)
   if (PasswordisCorrect){ 
    let token = jwt.sign(
      { _id: foundUser._id, email: foundUser.email },
      process.env.PRIMARY_KEY
    );
    res.cookie("token", token);
    res.json({msg: "your login went succsefuly"})
      
  } else res.json({ msg: "your password is not match" });
      
 }else{
   res.json({msg: 'your email in not exists'})
 }
 
})

router.get('/logout',(req,res)=>{
  res.cookie("token","")
  res.json({msg: 'token went remove'})

})


function inLoggedin(req,res,next){
  if(req.cookies.token ===""){
    res.json({msg: "you shouls loggin first"})
  }else{
    let data = jwt.verify(req.cookies.token, process.env.PRIMARY_KEY)
    req.user = data;
  }
  next()


}


module.exports = router

