const  mongoose = require("mongoose");

const connectDb = (url) => {
  
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => { console.log("---------->DB connected<--------------") }).catch((err) => {
  console.log("error", err)
})
}


module.exports = connectDb;