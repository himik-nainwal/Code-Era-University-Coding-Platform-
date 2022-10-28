const mongoose = require("mongoose");

const userDetailsSchema=new mongoose.Schema({
    student_id:Number,
    password: String,
    email: { type: String, unique: true },
    uname: String,

},
{
    collection:"Info"
 }
//, {
//     timestamps:true
//  }
 );

mongoose.model("Info",userDetailsSchema);