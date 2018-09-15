const express = require('express');
const bodyParser=require('body-parser');
const {ObjectID} = require('mongodb');
const morgan = require('morgan');
const fs = require('fs');
var path = require('path')

const _ = require('lodash');

const {mongoose} = require('./db/mongoose');

const {fetchCart,addToCart} = require('./service/cartService');

const {Cart} = require('./models/cart');
const {Item} = require('./models/item');
const {User} = require('./models/user');
const app = express();

app.use(bodyParser.json());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('tiny', { stream: accessLogStream }))

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

app.get('/cart/getCart/:userId',async (req,res)=>{
  if(!ObjectID.isValid(req.params.userId)){
    res.status(400).send({
      message:"Invalid Id"
    });
  }
  const cart = await fetchCart(req.params.userId);
  if(!cart){
    res.status(404).send({
         message:"No item present in the cart"
     });
  }
  res.send({cart});
});

app.post('/cart/addToCart/:userId',async (req,res)=>{
  const userId =req.params.userId;
  if(!ObjectID.isValid(userId)){
    res.status(400).send({
      message:"Invalid user Id"
    });
  }
  let item = _.pick(req.body,['itemId','itemName']);
  const cart = await fetchCart(userId);
  const cartAdded = null;
  try{
    const cart = await addToCart(userId,item);
    res.send(cart);
  }catch(e){
    res.status(500).send(e);
  }
});

const port = process.env.port || 8080;

app.listen(port,()=>{
  console.log(`Started on ${port}`);
});
