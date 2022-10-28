const mongoose = require("mongoose");

const userDetailsSchema=new mongoose.Schema({
    uname:String,
    email:String,
    phone: Number,
},{
    collection:"Info"
});

mongoose.model("Info",userDetailsSchema);