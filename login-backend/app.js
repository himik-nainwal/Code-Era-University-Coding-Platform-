const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  console.log(req.body);
  const user = await User.findOne({ student_id });
  if (!user) {
    return res.send({ error: "User Not Found" });
  }
  // console.log(user.password);
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);

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
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userstudentid = user.student_id;
    await User.findOne({ student_id: userstudentid })
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
