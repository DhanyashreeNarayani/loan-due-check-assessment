const mongoose = require('mongoose');

const dueDateSchema = new mongoose.Schema({
  dueAmount: {
    type: Number,
  },
  dueDateOfTheMonth: {
    type: Number,
  },
  username: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('dueDate', dueDateSchema);
