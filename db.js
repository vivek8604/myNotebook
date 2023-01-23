// this is mongoose model used to connect database mongoose is top of the layer on mongoDb to connect to database
const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/ecommerce";
const connecToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongodb successfully")
    })
}
module.exports=connecToMongo;