const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path');
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000    

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('static'))

app.set('view engine','ejs')                              //setting template engine
//router page
const authroutes = require("./routes/auth");

require("./db/registerdb");
const Register = require("./models/registermodel");
// '/' indexes using authroutes
app.use('/',authroutes);

                         
app.listen(port,(req,res)=>{                              //Running the server on specified port 
    console.log('Server up on port ' + port)
 })