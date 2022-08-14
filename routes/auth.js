const express=require("express");
const authrouter=express.Router();
const {createaccount,login}=require("../controllers/auth")

//methods
authrouter.route("/register")
.post(createaccount);
authrouter.route("/login")
.post(login);

module.exports=authrouter