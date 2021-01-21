const Register = require('../models/registermodel');
const nodemailer = require('nodemailer')

var email 
var otp = Math.random();
otp = otp*1000000;
otp = parseInt(otp);
console.log(otp);

let transporter = nodemailer.createTransport({
    host :  "smtp.gmail.com",
    port : "465",
    secure : true,
    service : "Gmail",
    auth:{
        user:'manjunath1dmm@gmail.com',
        pass:'msmv1234',
    }
})

exports.otpcon =(req,res) =>{
    email = req.body.mail;
    var mailOptions = {
        to: req.body.emailid
    }

}