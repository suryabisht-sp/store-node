require('dotenv').config()

const connectDB = require('./db/connectDb.js')
// const Product = require('./models/productschema.js')
const Products = require("./models/productsSchema.js")

const jsonProduct = require('./product.json')
const jsonProducts = require ('./products.json') 

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await Products.deleteMany()
    await Products.create(jsonProducts)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// to send data at once just type node populate

start()