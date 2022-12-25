require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require('./model/user');
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const auth = require('./middleware/auth')
const { findOne } = require("./model/user");

const app = express();

app.use(express.json());

app.post('/welcome', auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

app.post('/login',async(req,res)=>{

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);

//         const email = req.bod;
//         if(!email && !password){
//             res.status(400).send("all input is req");
//                 }

//         const user = await findOne({email});
        
        var decrypted = CryptoJS.AES.decrypt(user.password, "secret key 123").toString(CryptoJS.enc.Utf8);

        if(password===decrypted){
console.log('logged in successfully');
    

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
      return;
        }
    res.status(400).send("Invalid Credentials");


}catch (error) {
        console.log(error);
    }
})

app.post('/register',async(req,res)=>{
    
    try {
    const {first_name,last_name,email,password}=req.body;   
    if(!email && !password && !first_name && !last_name){
res.status(400).send("all input is req");
    }
    

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    var ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
console.log(ciphertext);


const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: ciphertext,
  });

const token = jwt.sign(
    {user_id:user._id,email},
    process.env.TOKEN_KEY,
    {
        expiresIn:'2h',
    }
);

user.token=token;
res.status(201).json(user);
} catch (error) {
    res.status(401);
}
})




// Logic goes here

module.exports = app;