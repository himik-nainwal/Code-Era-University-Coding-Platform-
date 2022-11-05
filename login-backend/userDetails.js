const mongoose = require("mongoose");

const userDetailsSchema=new mongoose.Schema({
    student_id:{type:Number,unique:true,require:true},
    password: {type:String,require:true},
    ph_no:{type:Number,unique:true},
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
        enum:["user","admin","dev"],
    },

    codeforces:{type:String},
    codechef: {type:String},
    leetcode :{type:String},
    course: {type:String},
    passing_out_year: {type:Number},
    linkedin: {type:String},
    score:{type:Number} 

},
{
    timestamps: true
},
{
    collection:"UserInfo"
 }

 );

mongoose.model("UserInfo",userDetailsSchema);