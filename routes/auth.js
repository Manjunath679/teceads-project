const express = require('express');
const router = express.Router();

// controller for signup page
const {signup} = require('../controllers/authc')
const {otpcon} = require('../controllers/authc')
const {reotp} = require('../controllers/authc')  
// signup page
router.get('/signup',(req,res) =>{
    res.render('signup')
})
// saving credentials of user
router.post('/signup',signup);
// sending otp for user
router.get('/emailverification',(req,res)=>{
    res.render('emailverification')
})
router.post('/emailverification',otpcon)        //Endpoint to verify email with otp


router.get('/editprofile', (req,res)=>{                    //Endpoint to render edit profile page of user
    res.render('editprofile')
})
router.post('/editprofile', (req,res)=>{                   //Endpoint to save changes in profile
    res.render('Updating your profile')
})
// for failures in signup page
router.get('/failures',(req,res)=>{
    res.render('failures');
})
router.post('/resend',reotp);

module.exports = router;
