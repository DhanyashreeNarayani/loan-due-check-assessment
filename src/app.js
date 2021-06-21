require('dotenv').config({ });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use('/', routes);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log('DB connection created successfully');
  } else {
    console.log('error in creating DB connection', err);
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  next();
});

app.use(cors());

app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

app.use((e, req, res, _next) => {
  e.status = e.status || 500;
  e.message = e.message || 'server error ';
  console.log(e);
  res.status(e.status).json({
    ok: false,
    message: e.message,
    error: e,
  });
});

module.exports = app;
