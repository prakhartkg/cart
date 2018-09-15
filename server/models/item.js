const mongoose = require('mongoose');

let Item = mongoose.model('Item',{
  name:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  }
});

module.exports = {Item}
