var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const loginauthRouter = require('./routes/loginauth')
const authenticatorRouter = require('./routes/authenticator');
const testRouter = require('./routes/test_cookie');
const refreshRouter = require('./routes/refresh');
const logoutRouter = require('./routes/logout');
const passport = require('passport');
var app = express();
const dotenv = require('dotenv');


dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(passport.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies['AuthToken'];
  const db = dbService.getDBServiceInstance();
  // Inject the user to the request
  db.getUserbyCookie(authToken)
      .then(data => {
        req.user=data;
        next()
      })
});*/

app.use('/register', authenticatorRouter);
app.use('/login', loginauthRouter);
app.use('/safespace', testRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next ){
  const status = err.status || 500;
  if( status >= 500 || req.app.get('env') === 'development'){
    console.error(err.stack);
  }
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const status = err.status || 500;
  res.status = status;
  const message = status >= 500 ? "Something's wrong": err.message;
  const expose = status >= 500 && req.app.get('env') === 'development';
  res.end(expose ? message + '\n\n' + err.stack : message);
});


//app.listen(8000);
module.exports = app;
