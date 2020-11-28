var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   "userId":String,
   "useName":String,
   "userPwd":String,
   "orderList":Array,
   "cartList":[{
    "productId":String,
    "productName":String,
    "salePrice":String,
    "productImage":String,
    "checked":String,
    "productNum":String
  }],
  "addressList":Array
});


module.exports = mongoose.model("User",userSchema)
