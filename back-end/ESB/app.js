const bodyParser = require('body-parser');
const createError = require('http-errors');
const cors = require('cors');
const authenticationRouter = require('./routes/authenticate');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: [process.env.ANALYTICS_URL, process.env.QNA_URL]}));
app.use(bodyParser.json());

//only one route to reroute to authenticator to check if given token is valid
app.use('/authenticate',authenticationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  if( status >= 500 || req.app.get('env') === 'development'){
    console.error(err.stack);
  }
  res.status(status);
  const message = status >= 500 ? "Something's wrong": err.message;
  const expose = status >= 500 && req.app.get('env') === 'development';
  res.send({message:expose ? message + '\n\n' + err.stack : message});
});

module.exports = app;
