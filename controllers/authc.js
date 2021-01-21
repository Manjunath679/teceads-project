const Register = require('../models/registermodel');
const express =  require('express');
const nodemailer = require('nodemailer')
const flash = require('connect-flash')
require('dotenv').config();
const app = express();

app.use(flash());

var email;
var otp = Math.random();
otp = otp*1000000;
otp = parseInt(otp);
console.log(otp);
// console.log(otp);
let transporter = nodemailer.createTransport({
    host :  "smtp.gmail.com",
    port : "587",
    secure : true,
    service : "Gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
})
// console.log(`${process.env.EMAIL}`);
// console.log(`${process.env.PASSWORD}`);

exports.signup = (req,res) =>{
    email = req.body.emailid;
    console.log(req.body);
    const {name,emailid,password,cpassword} = req.body;
    Register.findOne({emailid}).exec((err,user) =>{
        //if email already exists
        if(user){
            const message = "User with emailid already exists"
            return res.status(400).render('failures',{message});
        }
        let newUser = new Register({name,emailid,password});
        if(password!=cpassword){
            // if password and confirm passwords are not same
            const message = "Password and Confirm Passwords are not same"
            return res.status(400).render('failures',{message})
        }
        else{
                
                var mailOptions  ={
                    to: req.body.emailid,
                    subject:"OTP for registration is: ",
                    html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
                };
                transporter.sendMail(mailOptions,(err,info) =>{
                    if(err)
                    {
                        return console.log(err);
                    }
                    console.log('Message sent : %s',info.messageId);
                    console.log('Preview URL: %s',nodemailer.getTestMessageUrl(info));

                    res.render('emailverification');
                })
        }
    })
}
exports.otpcon = (req,res) =>{
    if(req.body.otp==otp)
    {
        res.send('created account successfully')
    }
    else{
        return res.status(400).render('emailverification');
    }
}
exports.reotp = (req,res) =>{
    var mailOptions={
        to:email,
        subject:"OTP for registration is :",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
    };
    transporter.sendMail(mailOptions,(err,info) =>{
        if(err)
        {
            return console.log(err);
        }
        console.log('Message sent : %s',info.messageId);
        console.log('Preview URL: %s',nodemailer.getTestMessageUrl(info));
        res.redirect('emailverification');
    })
}