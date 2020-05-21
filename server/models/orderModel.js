var mongoose = require('mongoose');  
var OrderSchema = new mongoose.Schema({  
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  trackingId: {
    type: String,
    required: false
  }
});
mongoose.model('Order', OrderSchema);

module.exports = mongoose.model('Order');