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
require("./codeDetails");

const User = mongoose.model("UserInfo");

const Problem = require("./problem");   // for questions details

const code= mongoose.model("codes"); // for question code

// console.log(mongoose.models);

// API to register or directly enter through json through postman
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


// Adding questions API 
app.post("/add_question_code", async (req,res) =>{
  const {
      ques_id,
      lang_id,
      cpp_boilerplate,
      py_boilerplate,
      correct_code,
      custom_judge,
      example_test_case_input,
      example_test_case_output,
      all_test_cases_input,
      all_test_cases_output,
  } = req.body;
  try {
      const old_question = await code.findOne({ques_id});
      if(old_question) {
          return res.send({error : "Same question Exists "});
      }
      await code.create({
      ques_id,
      lang_id,
      cpp_boilerplate,
      py_boilerplate,
      correct_code,
      custom_judge,
      example_test_case_input,
      example_test_case_output,
      all_test_cases_input,
      all_test_cases_output,
      });
      res.send({status : "Ok Done !"});
  } catch (error){
      res.send({status: "Error "});
      console.log(error);
  }
});


// Adding question details
app.post("/add_question_details",async(req,res)=>{
  const {
      ques_id,
      question_title,
      question_title_slug,
      difficulty_level,
      description_html,
  }=req.body;
  try {
      const old_version =await Problem.findOne({ques_id});
      if(old_version){
          return res.send({error : "Same question Exists "});
      }
      await Problem.create({
          ques_id,
          question_title,
          question_title_slug,
          difficulty_level,
          description_html,
      });
      res.send({status : "Ok Done ! "});
  }
  catch(error){
      res.send({status : "Error "});
      console.log(error);
  }
});

// To get Code details 

app.get("/get_question_code/:question_id",async(req,res)=>{
  try{
   const question_id=req.params.question_id;
   //console.log(question_id);
    const question_parameters = await code.find({ques_id: question_id});
    // console.log(question_parameters); 
  return res.status(200).json({ status: "success", data: question_parameters });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.json({ status: "Something went wrong" });
  }
});


// API for leaderboard 

app.get("/usermeta", async (req, res) => {
  try {
    const user = await User.find({},{password:0});
    return res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.error(error);
    res.json({ status: "Something went wrong" });
  }
});


// To get Profile info of others

app.get("/oprofile/:studentid",async(req,res)=>{
  try{
    const studentid = req.params.studentid;
    const person = await User.findOne({student_id:studentid},{password:0});
    if (!person) return res.json({ status: "Invalid Student Id" });
    return res.status(200).json({ status: "success", data: person });

  }
  catch (error) {
    console.error(error);
    res.json({ status: "Something went wrong" });
  }
});

