const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.models");
const {register,login,logout,getLogin,profile} = require('../controllers/user.controller') 



router.get("/profile", inLoggedin, profile);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/login", getLogin);

function inLoggedin(req, res, next) {
  if (req.cookies.token === "") {
    res.json({ msg: "you shouls loggin first" });
  } else {
    let data = jwt.verify(req.cookies.token, process.env.PRIMARY_KEY);
    req.user = data;
  }
  next();
}

module.exports = router;
