const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')

app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/',require('./routes/user.routes'))


app.get("/", (req, res) => {
  res.render("register");
});
  
    
       
mongoose
  .connect("mongodb://localhost:27017/Ramadan-DB")
  .then(() => app.listen(3000,()=> console.log('server on port 3000')))
  .catch((err)=> console.log(err))
