const mongoose = require('mongoose');
const { Schema } = mongoose;
const noteSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,// here type means take the user id from referemce database that is user
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
  });
  module.exports=mongoose.model('note',noteSchema)// it takes two thing 1 is model and 2 i schema here model is note and scema is noteSchema