var mongoose = require('mongoose');  
var pendingRefill = new mongoose.Schema({  
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  bottleId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bottle',
    required: true,  
  },
  refillProduct: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true,
  },
  price: {
    type: Number
  },
  size: {
    type: String,
    required: false
  }
});
mongoose.model('RefillOrder', pendingRefill);

module.exports = mongoose.model('RefillOrder');