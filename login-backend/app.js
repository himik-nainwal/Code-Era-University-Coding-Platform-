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

// API to register or directly ender through json through postman
app.post("/register", async (req, res) => {
  const {
    student_id,
    password,
    email,
    fname,
    lname,
    uname,
    q_done,
    github_link,
    easy_q,
    medium_q,
    hard_q,
    pic_url,
    role,
    codeforces,
    codechef,
    leetcode,
    course,
    passing_out_year,
    linkedin,
    score
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
      fname,
      lname,
      email,
      uname,
      q_done,
      github_link,
      easy_q,
      medium_q,
      hard_q,
      pic_url,
      role,
      codeforces,
      codechef,
      leetcode,
      course,
      passing_out_year,
      linkedin,
      score,
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
    const token = jwt.sign({student_id:user.student_id}, JWT_SECRET);

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
  // console.log(token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    //console.log(user);

    const sid = user.student_id;
    User.findOne({ student_id: sid })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});


// Forgot Password ! 

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adarsh438tcsckandivali@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
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
    

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});