const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required:[true, "UserName is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique:[true, "Email address already registered"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
    
  },  
  createdAt: {
    type: Date, default: Date.now()
  },
  lastName: {
    type: String
  }

})

module.exports = mongoose.model("user", UserSchema)