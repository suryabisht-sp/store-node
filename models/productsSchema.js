const mongoose = require("mongoose")

const productsSchemas = new mongoose.Schema({
  product_id: {
    type: String,
  },
  categoryId: {
    type: Number,
  },
  name: {
    type: String,
  }, 
 
   description: {
    type: String,
  },
       features: {
    type: String,
    default: false
  },
   rate: {
    type: Number,
  },
  keywords: {
    type: String,
  },
rating: {
    type: Number,
    default:4.5
  },
  createdAt: {
    type: Date, default: Date.now()
  },
  review: {
   type:Number
  },
  imageUrl: {
    type: String
  },
    new: {
    type: Boolean,
  },
  // company: {
  //   type: String,
  //   enum: {
  //     values: ["ikea", "liddy", "nike", "raymonds", "lotus"],
  //     message:'{value} is not supported'
  //   }
    // enum:["ikea", "liddy", "nike", "raymonds", "lotus"]
  })

module.exports = mongoose.model("product", productsSchemas)