const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors')
const redis = require('redis');

const app = express();
const getQuestionRouter = require('./routes/question/get')
const getAnswerRouter = require('./routes/answer/get')
const answerRouter = require('./routes/answer/create')
const questionRouter = require('./routes/question/create');

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
app.use(cors())

app.use('/createquestion',questionRouter);
app.use('/createanswer', answerRouter);
app.use('/getanswers', getAnswerRouter);
app.use('/getquestions', getQuestionRouter);

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

// check if service subscribed to channel2 and if not subscribe
// channel1: for authenticator - analytics services communication
// channel2: for authenticator -qnaoperations services communication
pool.hget('subscribers', 'channel2', async (err, data) => {
    let currentSubscribers = JSON.parse(data);
    let alreadySubscribed = false;
    let myAddress = process.env.OPERATIONS_PORT + '/bus';
    for (let i=0; i<currentSubscribers.length; i++) {
      if (currentSubscribers[i] == myAddress) {
        alreadySubscribed = true;
      }
    }
    if (alreadySubscribed == false) {
      currentSubscribers.push(myAddress);
      pool.hset('subscribers', 'channel2', JSON.stringify(currentSubscribers),()=>{})
      console.log('The qnaoperations service was subscribed to channel 2.');
    }
})
*/

module.exports = app;
