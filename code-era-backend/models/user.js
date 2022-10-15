const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    profilePicUrl:{
        type: String,
    },
    cloudinaryId :{
        type:String,
    },
    role : {
        type: String,
        default: "user",
        enum: ["user","admin","root"],
    },
    resetToken: {
        type: String,
    },
    expireToken: {
        type: Date,
    },
},
{
    timestamps: true
}
);

module.exports= mongoose.model(mongoose.models.User || "User",UserSchema);