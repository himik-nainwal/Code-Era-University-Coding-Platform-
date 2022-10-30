const mongoose = require("mongoose");

const userDetailsSchema=new mongoose.Schema({
    student_id:{type:Number,unique:true,require:true},
    password: {type:String,require:true},
    fname:{type:String},
    lname:{type:String},
    email: {type:String},
    uname: {type:String},
    q_done:{type:Number},
    github_link:{type:String},
    easy_q:{type:Number},
    medium_q:{type:Number},
    hard_q:{type:Number},
    pic_url:{type:String},
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },

},
{
    timestamps: true
},
{
    collection:"UserInfo"
 }

 );

mongoose.model("UserInfo",userDetailsSchema);