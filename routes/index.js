const express=require("express");
const router=express.Router();
const protectRoute=require("../controllers/authhelper");
const {handler,totalamount}=require("../controllers/stripe");
const {savebook,getbook,deletebook}=require("../controllers/cartbook");
var Publishable_Key = 'pk_test_51LQ8HXSA1nv36TLXMKrpbo0XEzw4wGTrHAkIi7WjdvO9TOThSb97L6B2SVQkkjQZxY4LtXIozjgQY37iPBtrvY3D00lbG4V1oK'

router.route("/")
.get((req,res)=>{res.render("index",{
    username:req.cookies.username || "Login/SignUp",
})});

router.route("/login")
.get((req,res)=>{res.render("login",{
    username:req.cookies.username || "Login/SignUp",
})});

router.route("/register")  
.get((req,res)=>{res.render("register",{
    username:req.cookies.username || "Login/SignUp",
})});

router.route("/cart")
.get(protectRoute,(req,res)=>{res.render("cart",{
    username:req.cookies.username || "Login/SignUp",
})});

router.route("/cart/books")
.get(protectRoute,getbook)
.delete(protectRoute,deletebook);


router.route("/cart/books/buy")
.get(protectRoute,totalamount,(req,res)=>{res.render("stripe", { 
    key: Publishable_Key,
    username:req.cookies.username || "Login/SignUp",
    price:req.cookies.totalamount*100,
    })})
.post(protectRoute,handler,deletebook)



router.route("/about")
.get((req,res)=>{res.render("about",{
    username:req.cookies.username || "Login/SignUp",
})});

router.route("/bookdesc/:title/:cover/:author/:date/:pages/:key")
.get((req,res)=>{res.render("bookdesc",{
    BookName : req.params.title,
    coverlink :req.params.cover,
    authorName :req.params.author,
    dateofp :req.params.date,
    pages :req.params.pages,
    key:req.params.key,
    price: Math.floor((Math.random() * 100) + 100),
    username:req.cookies.username || "Login/SignUp",
})})
.post(protectRoute,savebook);


module.exports=router