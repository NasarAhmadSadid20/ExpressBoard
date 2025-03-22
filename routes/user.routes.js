const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const multer = require('multer')
const upload = multer({ dest: "public/image/" });
const userModel = require("../models/user.models");
const {
  register,
  login,
  logout,
  getLogin,
  profile,
  post,   
  AllPost,
  
} = require("../controllers/user.controller"); 
  
  
  
router.get("/profile",inLoggedin, profile);
router.get("/allPost",inLoggedin, AllPost);
router.post("/create-post", inLoggedin, upload.single('newImagePost'), post);
router.post("/register", upload.single("profPhoto"), register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/login", getLogin);

// router.get("/newPost",newPost);

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
