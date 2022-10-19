const mongoose = require("mongoose");

const QuestionSchema =new mongoose.Schema({
    question_id:{
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
});

module.exports= mongoose.model(mongoose.models.Question || "Question",QuestionSchema);