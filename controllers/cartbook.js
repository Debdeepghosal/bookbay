const Bookmodel = require('../models/bookmodel')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const savebook=async (req,res)=>{
  (req.body).email1=req.cookies.email;
  // (req.body).email1="ghosaldebdeep16@gmail.com";
  console.log(req.body);
  const book= await Bookmodel.create(req.body);
  res.status(StatusCodes.CREATED).json({ message:"Added" });
}

const getbook=async (req,res)=>{
  (req.body).email1=req.cookies.email;
  Bookmodel.find({email1:req.cookies.email},(error,data)=>{
    if(error){
      console.log(error);
    }
    else{
      res.json(data);
      // res.send(data);
      // console.log(data);
    }
  })
}

const deletebook=async (req,res)=>{
   Bookmodel.deleteMany({}).then(function(){
    console.log("data deleted");
   })
}


module.exports={savebook,getbook,deletebook}