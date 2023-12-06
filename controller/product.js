// const Product = require("../models/productschema.js")
const Product = require("../models/productsSchema.js")
//time 4:26:28

const getAllProducts = async (req, res) => {
  const search = "b"

  const products = await Product.find({
    name:{$regex: search, $options: 'i'},
  })
  res.status(200).json({products})
}

const getAllProductStatic = async (req, res) => {
  // console.log("Products", req.query)
  // used to find directly what comes in query
  // const product = await Product.find(req.query)
  
  const { name,product_id } = req.query
  const queryObj={}
  if (product_id) {
    queryObj.product_id = product_id
  }
   if (name) {
  queryObj.name = {$regex: name, $options: 'i'}
}
  const product = await Product.find(queryObj)
  res.status(200).json({ product, Total_Product: product.length })
} 

module.exports = {
  getAllProductStatic, getAllProducts
}