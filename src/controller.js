const Joi = require('joi');
const user = require('./service/user');
const dueDate = require('./service/dueDate');

const user_schema = Joi.object({
  username: Joi.string().required(),
  location: Joi.string().required(),
  amount: Joi.number().required(),
  mobile_number: Joi.string().required(),
  additional_charges: Joi.number().required(),
});

const due_schema = Joi.object({
  dueAmount: Joi.number().required(),
  dueDateOfTheMonth: Joi.number().required(),
  username: Joi.string().required(),
});

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const controller = {};

controller.addUser = async (req, res, next) => {
  try {
    console.log(req.headers, 'Request body');
    const { error } = user_schema.validate(req.body, options);
    if (error) {
      throw error;
    }
    const {
      username, location, amount, mobile_number, additional_charges,
    } = req.body;
    await user.addUserDetils(username, location, amount, mobile_number, additional_charges);
    next();
  } catch (error) {
    next(error);
  }
};

controller.getUsersDetails = async (req, res, next) => {
  try {
    const users = await user.getUsers();
    return res.render('customer', { users });
  } catch (error) {
    next(error);
  }
};

controller.addDueDetails = async (req, res, next) => {
  try {
    const { error } = due_schema.validate(req.body, options);
    if (error) {
      throw error;
    }
    console.log(req.body, 'REquest bdoy');
    const { dueAmount, dueDateOfTheMonth, username } = req.body;
    await dueDate.upsertDueDate(username, dueAmount, dueDateOfTheMonth);
    return next();
  } catch (error) {
    next(error);
  }
};

controller.getdueDetails = async (req, res, next) => {
  try {
    const users = await dueDate.getDueDetailsByUsername();
    return res.render('dueDetails', { users });
  } catch (error) {
    next(error);
  }
};

controller.calculateDueDetails = async (req, res, next) => {
  try {
    const { date, username } = req.body;
    const dueCost = await dueDate.getDueCost(username, date);
    return res.render('calculateddue', { dueCost });
  } catch (error) {
    next(error);
  }
};

module.exports = controller;
