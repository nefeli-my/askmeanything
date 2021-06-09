const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const loginauthRouter = require('./routes/login')
const authenticatorRouter = require('./routes/authenticator');
const testRouter = require('./routes/test_cookie');
const logoutRouter = require('./routes/logout');
const updateRouter = require('./routes/updateUser');
const getRouter = require('./routes/getUser');
const passport = require('passport');
const redis = require('redis');

const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

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
app.use(cors());


app.use('/register', authenticatorRouter);
app.use('/login', loginauthRouter);
app.use('/safespace', testRouter);
app.use('/update', updateRouter);
app.use('/get', getRouter);
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
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      msg: err.errors.map(e => e.message)
    })
  }
  else {
    next(err)
  }
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const status = err.status || 500;
  res.status(status);
  const message = status >= 500 ? "Something's wrong": err.message;
  const expose = status >= 500 && req.app.get('env') === 'development';
  res.send({msg: expose ? message + '\n\n' + err.stack : message});
});


// Redis connection
const TotalConnections = 10;
const pool = require('redis-connection-pool')('myRedisPool', {
  host: process.env.REDIS_HOST,   // localhost
  port: process.env.REDIS_PORT,   // Redis Port: 6379
  maxclients: TotalConnections,
});
console.log('Connected to Redis');

// check if service subscribed to channel1 and channel2 and if not subscribe
// channel1: for authenticator - analytics services communication
// channel2: for authenticator -qnaoperations services communication
pool.hget('subscribers', 'channel1', async (err, data) => {
    let currentSubscribers = JSON.parse(data);
    let alreadySubscribed = false;
    let myAddress = process.env.AUTH_PORT + '/bus' + '/channel1';
    for (let i=0; i<currentSubscribers.length; i++) {
      if (currentSubscribers[i] == myAddress) {
        alreadySubscribed = true;
      }
    }
    if (alreadySubscribed == false) {
      currentSubscribers.push(myAddress);
      pool.hset('subscribers', 'channel1', JSON.stringify(currentSubscribers),()=>{})
      console.log('The authenticator service was subscribed to channel 1.');
    }
})

pool.hget('subscribers', 'channel2', async (err, data) => {
    let currentSubscribers = JSON.parse(data);
    let alreadySubscribed = false;
    let myAddress = process.env.AUTH_PORT + '/bus' + '/channel2';
    for (let i=0; i<currentSubscribers.length; i++) {
      if (currentSubscribers[i] == myAddress) {
        alreadySubscribed = true;
      }
    }
    if (alreadySubscribed == false) {
      currentSubscribers.push(myAddress);
      pool.hset('subscribers', 'channel2', JSON.stringify(currentSubscribers),()=>{})
      console.log('The authenticator service was subscribed to channel 2.');
    }
})

module.exports = app;
