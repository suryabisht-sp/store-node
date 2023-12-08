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
  const { name,product_id, sortByName, sortByPrice } = req.query
  // used to find directly what comes in query
  // const product = await Product.find(req.query)
  console.log("first", req.query)
  const queryObj={}
  if (product_id) {
    queryObj.product_id = product_id
  }
   if (name) {
  queryObj.name = {$regex: name, $options: 'i'}
   }
    const sortOptions = {};
 // Sorting by Name ""
  if (sortByName) {
    if (sortByName === 'ascN'){
      sortOptions.name = 1
    }
      if (sortByName === 'desN'){
      sortOptions.name = -1
    }
  }
  // Sorting by Price
    if (sortByPrice) {
      if (sortByPrice == 'asc') {
        sortOptions.rate = 1
      }
      if (sortByPrice == 'des') {
        sortOptions.rate = -1
      }
  }

  try {
     const products = await Product.find(queryObj).sort(sortOptions);

    // console.log('Sorted Products:', products);

    res.status(200).json({ products, Total_Product: products.length });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 

module.exports = {
  getAllProductStatic, getAllProducts
}