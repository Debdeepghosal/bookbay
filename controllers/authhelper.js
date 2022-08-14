const jwt=require("jsonwebtoken");


function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
        let isVerified=jwt.verify(req.cookies.isLoggedIn,process.env.JWT_SECRET);
        console.log("account verified");
        if(isVerified){
            next();
        }
        else{
            // return res.json({
            //     message:"user not verified"
            // })
            return res.redirect('/login');
        }
    }
    else{
        // return res.json({
        //     message:"operation not allowed"
        // })
        return res.redirect('/login');
    }
}

module.exports = protectRoute