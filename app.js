const express = require('express')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())
app.use('/',require('./routes/user.routes'))

  
    
      
mongoose
  .connect("mongodb://localhost:27017/Ramadan-DB")
  .then(() => app.listen(3000,()=> console.log('server on port 3000')))
  .catch((err)=> console.log(err))
