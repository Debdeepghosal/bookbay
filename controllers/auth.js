const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");



const createaccount=async (req,res)=>{
  try{
  const user= await User.create(req.body);
  // const token = user.createJWT()
  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
   return res.redirect('/');
  }
  catch(err){
    res.status(400).send(new Error('Account already Exists !'));
  }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      // throw new UnauthenticatedError("Invalid Credentials");
      res.status(400).send(new Error('Invalid Credentials'));
    }
    else{
    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      // throw new UnauthenticatedError("Invalid Credentials");
      res.status(400).send(new Error('Invalid Credentials'));


    }
    else{
      // const token = user.createJWT()
      // res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
      const id=new Date().getDate();
      const token=jwt.sign ({id,email},process.env.JWT_SECRET,{expiresIn:'30d'})
      // res.status(200).json({msg:"accout created",token:token})
      console.log(token);
      res.cookie("isLoggedIn",token,{httpOnly:true});
      res.cookie("email",email,{httpOnly:true});
      res.cookie("username",user.name,{httpOnly:true});

     return res.redirect('/');
    }
  }
  }


module.exports={createaccount,login,}