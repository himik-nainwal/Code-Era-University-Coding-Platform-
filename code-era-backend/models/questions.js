const mongoose = require("mongoose");
const UserSchema =new mongoose.Schema({
    id:{
        type: Number,
        required:true,
        unique:true,
    },
    question_title:{
        type: String,
        required:true,
    },
    title_slug:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },

},
{
    timestamps:true
})