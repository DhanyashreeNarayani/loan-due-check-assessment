const userModel = require('../models/user');

const service = {};

service.addUserDetils = (username,
  location, amount, mobile_number, additional_charges) => userModel.updateOne({ username }, {
    username,
    location,
    amount,
    mobileNumber: mobile_number,
    additional_charges,

  }, {
    upsert: true,
  });

service.getUserDetails = (username) => userModel.findOne({ username });

service.getUsers = () => userModel.find({}).lean().exec();

module.exports = service;
