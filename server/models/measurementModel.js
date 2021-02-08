var mongoose = require('mongoose');

var MeasurementSchema = new mongoose.Schema({  
    bottleId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bottle',
        required: true,
    },
    datetime: Date,
    percent: Number,
    contents: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true,
    },
});
mongoose.model('Measurement', MeasurementSchema);

module.exports = mongoose.model('Measurement');