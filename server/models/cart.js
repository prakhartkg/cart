const mongoose = require('mongoose');
const validator = require('validator')
let Cart = mongoose.model('Cart',{

  userId:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true
  },
  items:[{
    itemId:{
      type:String,
      required:true
    },
    itemName:{
      type:String,
      required:true
    }
  }]
});

module.exports = {Cart}
