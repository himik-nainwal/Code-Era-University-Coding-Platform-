const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require("../../models/user");

module.exports = {
  login(req, res, next) {
    res.status(200).send("Login");
  },
  async register(req, res, next) {
    try{
      const { name,email,username,password, role} = req.body;
      
      const user = await User.findOne({email: email.toLowerCase()});
      if(user) return res.status(401).send("Email already registered");
      const saveUser = {
          name,
          email: email.toLowerCase(),
          username: username.trim(),
          password: await bcrypt.hash(password, 10),
        
      }
      if(role) saveUser.role=role;
      const newUser=await new User(saveUser).save();

      jwt.sign({
        type: 'user',
        userId : newUser._id,
      },process.env.SECRET,{expiresIn:"7d"},(err,token) =>{
          if(err) throw err;
          return res.status(201)
          .json({success : true, user :newUser,token});
      }
      );
      
    
    } catch(error){
      console.log(error);
    }
  },
};
