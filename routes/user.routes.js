const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.models");
const {
  register,
  login,
  logout,
  getLogin,
  profile,
} = require("../controllers/user.controller"); 


  
router.get("/profile",inLoggedin, profile);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/login", getLogin);

function inLoggedin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "شما باید ابتدا لاگین کنید!" });
  }

  try {
    const data = jwt.verify(token, process.env.PRIMARY_KEY);
    req.user = data; // ذخیره اطلاعات کاربر در `req`
    next(); // ادامه پردازش درخواست
  } catch (error) {
    return res
      .status(403)
      .json({ msg: "توکن نامعتبر است، لطفاً دوباره لاگین کنید!" });
  }
}


module.exports = router;
