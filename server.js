const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
require("dotenv").config();

<<<<<<< HEAD
mongoose.connect(process.env.MONGO_URL);
=======


mongoose.connect('process.env.MONGO_URL')
>>>>>>> e2b580257ce7e85108b588733cbc67ebda9c4938

const db = mongoose.connection;

db.on('error',()=>{
    console.log('Error');
})
db.once('open',()=>{
    console.log("Connected");
})

app.set('view engine' ,'ejs')
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('public'));

// link router
const urlRouter = require('./routes/urlRout')
app.use('/', urlRouter)
app.listen(PORT, ()=>{
    console.log("server is running");
})
