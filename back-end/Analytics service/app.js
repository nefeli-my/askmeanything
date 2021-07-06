const bodyParser = require('body-parser');
const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const generalRouter = require('./routes/general');
const userRouter = require('./routes/user');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: process.env.FRONT_URL}));     //let only front-end of app access its services
app.use(bodyParser.json());

//two basic routes, one for general statistics and one for statistics of signed-in user
app.use('/general/',generalRouter);
app.use('/user/', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
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
