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
   req.body.password = await cryptPassword(req.body.password)
   const newUser =  new userModel(req.body);
    await newUser.save()
   res.send(newUser)
})
  
// login users
router.get('/login',async(req,res)=>{
 const {email, phone , password} = req.body
 const foundUser = await userModel.findOne({$or:[{email}, {phone}]})
  if(foundUser){
  const PasswordisCorrect = await bcrypt.compare(password , foundUser.password)
   if (PasswordisCorrect){
      res.send(PasswordisCorrect);
  } 
      //   jwt
 }
 
})

router.post('/login',(req,res)=>{

})

module.exports = router

