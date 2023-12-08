const mongoose = require("mongoose")

const otpVerificationEmail = new mongoose.Schema({
  userId: {
    type: String,
    required:[true, "Id is missing"]
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date
  },
  expires: {
    type: Date
  }
})


module.exports= mongoose.model("otpVerifyEmail", otpVerificationEmail)