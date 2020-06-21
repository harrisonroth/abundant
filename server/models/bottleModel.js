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
  measurements: [{
    date: Date,
    percent: Number,
  }],
  dailyAverages: [{
    date: Date,
    percent: Number,
  }],
  batteryPercent: {
    type: Number,
  },
  contents: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true,
  },
  refillContents: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  }
});
mongoose.model('Bottle', BottleSchema);

module.exports = mongoose.model('Bottle');