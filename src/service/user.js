const userModel = require('../models/user');

const service = {};

service.addUserDetils = (username,
  location, amount, mobile_number, additional_charges) => userModel.create({
  username,
  location,
  amount,
  mobile_number,
  additional_charges,

});

service.getUserDetails = (username) => userModel.findOne({ username });

service.getUsers = () => userModel.find({}).lean().exec();

module.exports = service;
