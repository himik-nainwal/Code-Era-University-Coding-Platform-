const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const JWT_SECRET = "myPasswrdis100%sexy";

const mongoUrl =
  "mongodb+srv://TeamrockeT:Cn3sszf7EjIS3nJq@cluster0.u1dxoy9.mongodb.net/codeera?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((e) => console.log(e));

// Below code is for adding users through postman and mongo
require("./userDetails");

const User = mongoose.model("UserInfo");
const Problem = require("./problem");
const question= mongoose.model("Question");
// console.log(mongoose.models);

// API to register or directly ender through json through postman
app.post("/register", async (req, res) => {
  const {
    student_id, //done
    password, //done
    ph_no, //done
    email, //done
    fname, //done
    lname, //done
    userName, //done
    totalQ, //done
    github, //done
    easyQ, //done
    mediumQ, //done
    hardQ, //done
    image, //done
    role, //done
    codeforces, //done
    codechef, //done
    leetcode, //done
    course, //done
    passing_out_year, //done
    linkedin, //done
    score, //done
    university,
    questions, //done
  } = req.body;
  const encryptedpass = await bcrypt.hash(password, 10);

  try {
    const olduser = await User.findOne({ email });
    if (olduser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      student_id,
      password: encryptedpass,
      ph_no,
      fname,
      lname,
      email,
      userName,
      totalQ,
      github,
      easyQ,
      mediumQ,
      hardQ,
      image,
      role,
      codeforces,
      codechef,
      leetcode,
      course,
      passing_out_year,
      linkedin,
      score,
      university,
      questions,
    });
    res.send({ status: "Ok" });
  } catch (error) {
    res.send({ status: "Error" });
    console.log(error);
  }
});
// Login API
app.post("/login-user", async (req, res) => {
  const { student_id, password } = req.body;
  // console.log(req.body);
  const user = await User.findOne({ student_id });
  if (!user) {
    return res.send({ error: "User Not Found" });
  }
  // console.log(user.password);
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ student_id: user.student_id }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "Error" });
    }
  }
  return res.json({ status: "error", error: "Invalid Password" });
});

// // Login API
// app.post("/login-user",async(req,res)=>{
//     const {student_id, password}=req.body;

//     const user=await User.findOne({student_id});
//     if(!user){
//         return res.json({error:"User Not Found"});
//     }
//     if(compare(password,user.password)){
//         if(res.status(201)){
//             return res.json({status:"OK",data:password});
//         }
//         else{
//             return res.json({error:"error"});
//         }
//     }
//     res.json({status:"error",error:"Incorrect Password"});
// });

//API for getting user Data

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  //console.log(token);
  // console.log();
  try {
    const user = jwt.verify(token, JWT_SECRET);
    

    const sid = user.student_id;
    User.findOne({ student_id: sid })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});





// Forgot Password !

app.post("/forgot-password", async (req, res) => {
  const { student_id } = req.body;
  // console.log(student_id);
  try {
    const oldUser = await User.findOne({ student_id });
    
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      { student_id: oldUser.student_id, id: oldUser._id },
      secret,
      {
        expiresIn: "5m",
      }
    );
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    console.log(link);
  } catch (error) {}
});

//Getting Details 


app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", {
      student_id: verify.student_id,
      status: "Not Verified",
    });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { student_id: verify.student_id, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.get("/problem/:problemId", async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const problem = await Problem.findOne({ ques_id: problemId });
    if (!problem) return res.json({ status: "Invalid Question Id" });

    return res.status(200).json({ status: "success", data: problem });
  } catch (error) {
    console.error(error);
    res.json({ status: "Something went wrong" });
  }
});

app.get("/problems", async (req, res) => {
  try {
    const problems = await Problem.find();
    return res.status(200).json({ status: "success", data: problems });
  } catch (error) {
    console.error(error);
    res.json({ status: "Something went wrong" });
  }
});
