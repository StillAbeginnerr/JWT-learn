const config = process.env;
const jwt = require("jsonwebtoken");

const verifytoken = (req,res,next) =>{
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
console.log(token);
    if(!token)
    {
        return res.status(403).send("A token is required for authentication");;
    }

    try{
        const decoded = jwt.verify(token,config.TOKEN_KEY);
        console.log(decoded);
        console.log("hello")
        req.user = decoded;
res.status(200).send("great");
    }catch(err)
    {
        console.log(err);
    }
    return next;
};

module.exports = verifytoken;
