const {Cart} = require('./../models/cart');


fetchCart=(userId)=>{
  return Cart.findOne({
    userId
  });
};


addToCart = async (userId,item)=>{
  const cart = await fetchCart(userId);
  if(!cart){
    let cart = new Cart({
            userId : userId,
            items : [item]
          });
          return cart.save();
  }else{
    cart.items.push(item);
          return cart.save();
  }
};

module.exports={fetchCart,addToCart}
