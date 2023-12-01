const mongoose = require("mongoose")

const productSchemas = new mongoose.Schema({
  name: {
    type: String,
    required:[true, "Product name must be there"]
  },
   price: {
    type: Number,
    required:[true, "Price name must be there"]
  },
    featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default:4.5
  },
  createdAt: {
    type: Date, default: Date.now()
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "nike", "raymonds", "lotus"],
      message:'{value} is not supported'
    }
    // enum:["ikea", "liddy", "nike", "raymonds", "lotus"]
  }
})

module.exports = mongoose.model("product", productSchemas)