const path = require('path') 
const { nextTick } = require('process')
const Bookmodel = require("../models/bookmodel")
var Publishable_Key ='pk_test_51LQ8HXSA1nv36TLXMKrpbo0XEzw4wGTrHAkIi7WjdvO9TOThSb97L6B2SVQkkjQZxY4LtXIozjgQY37iPBtrvY3D00lbG4V1oK'
var Secret_Key ='sk_test_51LQ8HXSA1nv36TLXhqCSElKcWnbm033Aq1IFXraPfgy7HTFXfSbUyEVydRBrTiTjxirRz4Tpc8ANYcrUaZhYy2fa00XEdPzgJ9'

const stripe = require('stripe')(Secret_Key) 

async function totalamount(req,res,next){

    let amount=0;
    let data=await Bookmodel.find({})
    for (let i = 0; i < data.length; i++) {
        amount = amount+data[i].price;        
    }
    console.log(amount);
    res.cookie("totalamount",amount,{httpOnly:true});
    next();
}

const handler=(req,res,next)=>{ 
    
  
     stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Debdeep Ghosal', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.paymentIntents.create({ 
            amount: 80000,     
            description: 'Web Development Product', 
            currency: 'INR', 
            customer: customer.id 
        }) 
    }) 
    .then((charge) => {
        next();
        res.redirect('/');// If no error occurs
        

    })
    .catch((err) => { 
        console.log(err)    // If some error occurs 
    }); 
}

module.exports={handler,totalamount,}