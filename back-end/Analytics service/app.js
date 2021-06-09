const bodyParser = require('body-parser');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const redis = require('redis');

const generalRouter = require('./routes/general');
const userRouter = require('./routes/user');

const app = express();

dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(passport.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/general/',generalRouter);
app.use('/user/', userRouter);


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
  res.send({message:expose ? message + '\n\n' + err.stack : message});
});

/*
// Redis connection
const TotalConnections = 10;
const pool = require('redis-connection-pool')('myRedisPool', {
  host: process.env.REDIS_HOST,   // localhost
  port: process.env.REDIS_PORT,   // Redis Port: 6379
  maxclients: TotalConnections,
});
console.log('Connected to Redis');

// check if service subscribed to channel1 and if not subscribe
// channel1: for authenticator - analytics services communication
// channel2: for authenticator -qnaoperations services communication
pool.hget('subscribers', 'channel1', async (err, data) => {
    let currentSubscribers = JSON.parse(data);
    let alreadySubscribed = false;
    let myAddress = process.env.ANALYTICS_PORT + '/bus';
    for (let i=0; i<currentSubscribers.length; i++) {
      if (currentSubscribers[i] == myAddress) {
        alreadySubscribed = true;
      }
    }
    if (alreadySubscribed == false) {
      currentSubscribers.push(myAddress);
      pool.hset('subscribers', 'channel1', JSON.stringify(currentSubscribers),()=>{})
      console.log('The analytics service was subscribed to channel 1.');
    }
})
*/

module.exports = app;
