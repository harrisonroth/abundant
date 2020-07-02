var mongoose = require('mongoose');  
var ProductScema = new mongoose.Schema({  
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  type: { // Container or Fill
    type: String
  },
  sizes: [ // dimensions for containers, volume/weight or fill
    {
      value: String,
      label: String,
      price: Number
    }
  ],
  fillProducts: [{ // empty if type is fill
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
  }],
  price: {
    type: Number
  }
});
mongoose.model('Product', ProductScema);

module.exports = mongoose.model('Product');