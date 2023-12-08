const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required:[true, "UserName is required"]
  },
  UpdatedAt: {
    type: Date, default: Date.now()
  },
  lastName: {
    type: String
  },
  gender: {
    type:String
  },
  dob: {
    type: Date
  },
  Hobbies: {
    type: Array
  },
  image: {
    type:File
  },
  about: {
    type: String
  },
  phone: {
    type: Number
  }

})

module.exports = mongoose.model("user", UserSchema)