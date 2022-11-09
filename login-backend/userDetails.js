const mongoose = require("mongoose");

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
    image: { type: String, default: "https://iili.io/phWTP4.webp" },
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
    score: { type: Number },
    university: { type: String },
    questions: { type: [Number] },
  },
  {
    timestamps: true,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetailsSchema);
