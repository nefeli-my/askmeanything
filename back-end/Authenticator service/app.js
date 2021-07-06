const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const loginauthRouter = require('./routes/login')
const authenticatorRouter = require('./routes/authenticator');
const testRouter = require('./routes/check');
const logoutRouter = require('./routes/logout');
const updateRouter = require('./routes/updateUser');
const getRouter = require('./routes/getUser');
const passport = require('passport');
const app = express();
const cors = require('cors');

app.use(passport.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: [process.env.FRONT_URL, process.env.ESB_URL]})); //let only front-end of app and ESB access its services
app.use(bodyParser.json());

//6 self-explanatory routes
app.use('/register', authenticatorRouter);
app.use('/login', loginauthRouter);
app.use('/check', testRouter);      //check if token is valid
app.use('/update', updateRouter);   //update personal info of signed-in user
app.use('/get', getRouter);         //get personal info of signed-in user
app.use('/logout', logoutRouter);

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
  res.send({msg: expose ? message + '\n\n' + err.stack : message});
});

module.exports = app;
