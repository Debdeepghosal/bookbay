const mongoose =require("mongoose");

const BookSchema=new mongoose.Schema({
    key: {
        type: String,
        required: [true, 'Please provide key'],
      },
    price:{
      type: Number,
      required:[true,'mention the price'],
    },
      email1: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
      },
      
})

module.exports = mongoose.model('Bookmodel', BookSchema)