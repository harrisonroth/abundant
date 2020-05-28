var mongoose = require('mongoose');  
var BottleSchema = new mongoose.Schema({  
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  fillPercent: {
    type: Number,
  },
  batteryPercent: {
    type: Number,
  },
  contents: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  }
});
mongoose.model('Bottle', BottleSchema);

module.exports = mongoose.model('Bottle');