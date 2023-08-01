const jwt = require("jsonwebtoken");
const Register = require("../Model/register");

const auth = async(req,res,next)=>{
try{
const token = req.cookies.jwt;

const verifyUser = jwt.verify(
    token,
    "mynameisvindobahdurtapayoutuber"
    );

const user = await Register.findOne({
    _id : verifyUser._id});
    next();
}catch(error){
    res.status(401).send(error);
}    
}


module.exports = auth;