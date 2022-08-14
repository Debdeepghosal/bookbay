require('dotenv').config();
const bodyparser = require('body-parser') 
 const express=require("express");
 const app=express();
 const path = require('path');
 const cookieParser=require("cookie-parser");
 const connectDB = require('./db/connect');
 const session=require('express-session');
 const flash=require('connect-flash');
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
app.use(bodyparser.json()) 
app.use(session({
    secret : 'bookbay',
    cookie : {maxAge : null},
    saveUninitialized : false,
    resave : false,
}));
app.use((req,res,next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

//routes
app.use("/",router);
app.use("/api/v1/account",authrouter);





 const start=async()=>{
     try{
        await connectDB(process.env.MONGO_URI);
         app.listen(3000,()=>{
             console.log("server running at port 3000")
         })
     }
     catch(err){
         console.log(err);
     }
 };
 start();
