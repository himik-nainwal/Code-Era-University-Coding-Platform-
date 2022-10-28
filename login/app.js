import login from ''
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

app.post("/post",async(req,res)=>{
    console.log(req.body);
    const {data}=req.body;
try{
    if(data=="Himik"){
        res.send({status:"ok"})
        
    }
    else{
        res.send({status:"User not found"})
    }
}
catch(error){
    res.send({status:"Something went wrong , Try Again!"})
}
    
    
});

require("./userDetails");

const User= mongoose.model("Info");


app.post("/register",async(req,res)=>{
    const {name,email,phone}=req.body;
    try {
        await User.create({
            uname: name,
            email,
            phone: phone, 
        });
        res.send({status:"Ok"});
    } catch(error){
        res.send({status:"Error"});
    }
});
