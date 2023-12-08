const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const UserAuth = require("../models/User.js");
const otpVerification = require('../models/otpVerification.js');
const transporter = require('../emailConfig.js');
//time 4:26:28

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ "message": "Some fields are missing the values" })
  }
  const validationEmail = await UserAuth.find({ email })
  // check password
  if (validationEmail.length!==0){
     const data = await bcrypt.compare(password, validationEmail[0].password);
    if (data) {
      const accessToken = jwt.sign({
        user:
        {
          userName: validationEmail[0].userName,
          email: validationEmail[0].email,
          id: validationEmail[0]._id
        }
      }, process.env.ACCESS_SECRET_KEY, { expiresIn: "20m" })
      res.status(200).json({ "message": "Successful", accessToken,  userName: validationEmail[0].userName,
          email: validationEmail[0].email, })
    }
    else {
       res.status(400).json({ "message": "Password or Email is invalid" })
    }
  }
  else {
    res.status(401).json({ "message": "Email is not registered with us" })
  }
})

// register user api

const userRegister = asyncHandler(async (req, res) => {
  const { userName, email, password, lastName } = req.body
  if (!userName || !email || !password) {
    res.status(400).json({ "message": "All fields are Required" })
  }
  const userAvailable = await UserAuth.find({ email })
 if (userAvailable.length!==0) {
    res.status(400).json({ "message": "Email already registered with us" })
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = await UserAuth.create({
    userName,
    email,
    password: hashedPassword,
    lastName,
  })
  if (userData) {
    res.status(201).json({ "message":"successfull", _id: userData.id, email: userData.email })
  } else {
    res.status(400).json({ "message": req.body })
  }
  res.status(200).json({ "message": req.body })
})


const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const searchmail = await UserAuth.find({ email })
  if (searchmail.length!==0) {
    res.status(200).json({ "message": "sent mail" })
  }
  else {
    res.status(200).json({ "message": "Email is not valid" })
  }
})



const verifyUser = asyncHandler(async (req, res) => {
  const { email } = req.body
 try {
   const searchmail = await UserAuth.find({ email })
   console.log("first", searchmail)
    if (searchmail.length !== 0) {
      const otp = `${Math.floor(Math.random() * 999999)}`
       const mail_options = {
        from: "",
        to: email,
        Subject: "Verify you email",
        html: `<p>Enter <b>${otp}</b> to verify your email addess and your otp will expire in <b>${Date.now()+3600000}</b></p>`  
       }
       
      //has round for otp
      const saltRounds = 10;
      const hashedOtp = await bcrypt.hash(otp, saltRounds)
      const result = await otpVerification.create({
        userId: searchmail[0]._id,
        otp: hashedOtp,
        createdAt: Date.now(),
        expires: Date.now()+3600000
      })


       transporter.sendMail(mail_options, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });



      console.log("result==========================", result)

      res.status(200).json({ "message": "sent mail" })
    } else {
    res.status(400).json({ "message": "Email is not valid" })
  }    
  } catch (error) {
    res.status(401).json({ "message": "Email is not valid" })
  }
})

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ "message": req.user })
})


const userProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ "message": helllo })
})


module.exports = { userLogin, userRegister, currentUser,userProfile,resetPassword,verifyUser }