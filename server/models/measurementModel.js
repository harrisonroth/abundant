var mongoose = require('mongoose');  
var MeasurementSchema = new mongoose.Schema({  
  bottleId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bottle',
    required: true,
  },
  measurements: [
      {
        time: Date,
        weight: Number,
        percentage: Number
      }
  ]
});
mongoose.model('Measurement', MeasurementSchema);

module.exports = mongoose.model('Measurement');