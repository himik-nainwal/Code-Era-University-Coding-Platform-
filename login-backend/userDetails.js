const mongoose = require("mongoose");

// const codedetails = new mongoose.Schema({
//   questionId:{
//     type:Number
//   },
//   code:{
//     type:String
//   },
//   status:{
//     type:String
//     },
//   time:{
//     type:String
//   },
//   language:{
//     type:String
//   },
//   });

const userDetailsSchema = new mongoose.Schema(
  {
    student_id: { type: Number, unique: true, require: true },
    password: { type: String, require: true },
    ph_no: { type: Number, unique: true },
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    userName: { type: String },
    totalQ: { type: Number },
    github: { type: String },
    easyQ: { type: Number },
    mediumQ: { type: Number },
    hardQ: { type: Number },
    image: { type: String, default: "" },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "dev"],
    },

    codeforces: { type: String },
    codechef: { type: String },
    leetcode: { type: String },
    course: { type: String },
    passing_out_year: { type: Number },
    linkedin: { type: String },
    score: { type: Number, default: 0 },
    university: { type: String },
    questionIds: { type: [Number] },
    // code: [codedetails],
  },

  {
    timestamps: true,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetailsSchema);
