const express=require("express");
const app=express();
const mongoose =require("mongoose")

app.use(express.json());

const mongoUrl="mongodb+srv://TeamrockeT:Cn3sszf7EjIS3nJq@cluster0.u1dxoy9.mongodb.net/codeera?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log("Connected to Database");}).catch(e=>console.log(e));

app.listen(5000,()=>{
    console.log("Server Started");
});

// Below code is for adding users through postman and mongo
require("./userDetails");

const User= mongoose.model("Info");


app.post("/register",async(req,res)=>{
    const {sid,pass,email,uname}=req.body;
    try {
        await User.create({
            student_id:sid,
            password:pass,
            email,
            username:uname, 
        });
        res.send({status:"Ok"});
    } catch(error){
        res.send({status:"Error"});
        console.log(error);
    }
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

