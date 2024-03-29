var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  notifications: 
  {
    type: Array
  },
  settings: {
    type: Object
  },
  stripeId: {
    type: String
  },
  shippingAddress: {
    type: Object
  },
  billingAddress: {
    type: Object
  },
  admin: {
    type: Boolean
  }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');