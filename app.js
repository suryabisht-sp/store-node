require("dotenv").config()
//async errorr
require("express-async-errors")
const express = require("express")
const app = express()
const port = 3005
const connectDB = require("./db/connectDb.js")
const url_DB=process.env.MONGO_URL

const notfoundMiddlewre = require("./middleware/not-found.js")
const errorHandlr = require("./middleware/error-handler.js")
const productRouter =require('./routes/productRoute.js')

//middleware

app.use(express.json())

//routes

app.get("/", (req, res) => { res.send("<h1>hello store</h1>") })
app.use("/api/v1/products", productRouter)

app.use(notfoundMiddlewre)
app.use(errorHandlr)

const start =async () => {
  try {
   await connectDB(url_DB)
   app.listen(port, () => {
     console.log(`Server start at ${port}`)
   })
 } catch (error) {
console.log("error", error)  
 }
}

start()