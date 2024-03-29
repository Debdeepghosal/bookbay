require('dotenv').config({ path: 'config.env' });
const bodyparser = require('body-parser') 
 const express=require("express");
 const app=express();
 const path = require('path');
 const cookieParser=require("cookie-parser");
 const connectDB = require('./db/connect');
 const port=process.env.PORT || 8000;
//template engine setup
app.set("view engine","hbs");

//routers
const authrouter=require("./routes/auth");
const router=require("./routes/index");
const { runInNewContext } = require('vm');
//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static('./public'));
app.use(
    express.urlencoded({ extended: true })
);
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json());
//routes
app.use("/",router);
app.use("/api/v1/account",authrouter);





 const start=async()=>{
     try{
        await connectDB(process.env.MONGO_URI);
         app.listen(port,()=>{
             console.log("server running at port",port)
         })
     }
     catch(err){
         console.log(err);
     }
 };
 start();
