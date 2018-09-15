const express = require('express');
const bodyParser=require('body-parser');
const {ObjectID} = require('mongodb');

const _ = require('lodash');

const {mongoose} = require('./db/mongoose');

const {Cart} = require('./models/cart');
const {Item} = require('./models/item');
const {User} = require('./models/user');
const app = express();

app.use(bodyParser.json());

app.post('/items',(req,res)=>{
  var item = new Item({
    name : req.body.name
  });

  item.save().then((data)=>{
    res.send(data);
  },(e)=>{
    res.status(400).send(e);
  });

});

app.get('/cart/getCart/:userId',(req,res)=>{
  if(!ObjectID.isValid(req.params.userId)){
    res.status(400).send({
      message:"Invalid Id"
    });
  }
  Cart.findOne({
    userId:req.params.userId
  }).then((cart)=>{
      if(!cart){
        res.status(404).send({
          message:"No item present in the cart"
        });
      }
      res.send({cart});
    }).catch((e)=>{
      res.status(500).send()
    });
});

app.post('/cart/addToCart/:userId',(req,res)=>{
  const userId =req.params.userId;
  if(!ObjectID.isValid(userId)){
    res.status(400).send({
      message:"Invalid user Id"
    });
  }
  let item = _.pick(req.body,['itemId','itemName']);
  Cart.findOne({
    userId
  }).then((cartFetched)=>{
      if(!cartFetched){
        var cartAdded = new Cart({
          userId : userId,
          items : [item]
        });
        cartAdded.save().then((cartSaved)=>{
          res.send(cartSaved);
        });
      }else{
        cartFetched.items.push(item);
        cartFetched.save().then((cartSaved)=>{
          res.send(cartSaved);
        });
      }
  });

});

app.listen(8080,()=>{
  console.log('Started on 8080');
});
