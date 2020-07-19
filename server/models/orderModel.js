var mongoose = require('mongoose');  
var OrderSchema = new mongoose.Schema({  
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  items: {
    type: Array
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Number
  },
  trackingId: {
    type: String,
    required: false
  },
  stripeId: {
    type: String
  },
  date : {
    type: Date
  },
});
mongoose.model('Order', OrderSchema);

module.exports = mongoose.model('Order');