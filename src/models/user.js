const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  location: {
    type: String,
  },
  amount: {
    type: Number,
  },
  mobileNumber: {
    type: String,
  },
  additional_charges: {
    type: Number,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('user', customerSchema);
