const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')


// hash password 
async function cryptPassword(password){
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
   return hash
}
    
// register users
      
router.post('/register', async (req,res)=>{
   const {email, phone} = req.body
   
   const foundUser =  await userModel.findOne({$or:[{email}, {phone}]})
   if(foundUser){
      return res.json('user already exists')
   }
    req.body.password = await cryptPassword(req.body.password);
      const newUser = new userModel(req.body);
      await newUser.save();
      res.json(newUser);  

})   
   
// login users
router.post('/login',async(req,res)=>{
 const {email, phone , password} = req.body
 const foundUser = await userModel.findOne({$or:[{email}, {phone}]})
  if(foundUser){
  const PasswordisCorrect = await bcrypt.compare(password , foundUser.password)
   if (PasswordisCorrect){ 
      const token =  jwt.sign({_id : foundUser._id , name: foundUser.name},'primary_key')
      res.send(token);
  } else res.send('your password is not match')
      
 }else{
   res.json({msg: 'your email in not exists'})
 }
 
})


module.exports = router

