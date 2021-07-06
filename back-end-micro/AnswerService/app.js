const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const createRouter = require('./routes/create');
const getRouter = require('./routes/get');
const busRouter =  require('./routes/bus')
const passport = require('passport');
const app = express();
const redis_pool = require('redis-connection-pool');
const cors = require('cors');
const transaction = require('./middlewares/transaction');
const db = require('./server/models/index');
const {sync_messages} = require('./startup');

// middlewares
app.use(passport.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: [process.env.BUS_URL, process.env.FRONT_URL]}));
app.use(transaction({ sequelize: db.sequelize }));

// Redis connection
const TotalConnections = 10;
const pool = redis_pool('myRedisPool', {
    url: process.env.REDIS_URL,
    maxclients: TotalConnections,
});
console.log('Connected to Redis');

// services offered by the Answer microservice
pool.hset('services', 'AnswerService', JSON.stringify(['Create an answer to a specific question.',
                                                                      'Get all answers of clicked question']), ()=>{});

// the Answer Microservice is the publisher in the answers channel
pool.hget('publishers', 'channel_answers', async (err, data) => {
  let currentSubscribers = JSON.parse(data);
  let alreadySubscribed = false;
  let myAddress = process.env.ANSWER_URL;
  for (let i=0; i<currentSubscribers.length; i++) {
    if (currentSubscribers[i] == myAddress) {
      alreadySubscribed = true;
    }
  }
  if (alreadySubscribed == false) {
    currentSubscribers.push(myAddress);
    pool.hset('publishers', 'channel_answers', JSON.stringify(currentSubscribers),()=>{})
    console.log('The AnswerService service is publisher to channel_answers.');
  }
})

// subscribe the Answer Microservice to the users channel
pool.hget('subscribers', 'channel_users', async (err, data) => {
  let currentSubscribers = JSON.parse(data);
  let alreadySubscribed = false;
  let myAddress = process.env.ANSWER_URL;
  for (let i=0; i<currentSubscribers.length; i++) {
    if (currentSubscribers[i] == myAddress) {
      alreadySubscribed = true;
    }
  }
  if (alreadySubscribed == false) {
    currentSubscribers.push(myAddress);
    pool.hset('subscribers', 'channel_users', JSON.stringify(currentSubscribers),()=>{})
    console.log('The AnswerService service was subscribed to channel_users.');
  }
})

// subscribe the Answer Microservice to the questions channel
pool.hget('subscribers', 'channel_questions', async (err, data) => {
  let currentSubscribers = JSON.parse(data);
  let alreadySubscribed = false;
  let myAddress = process.env.ANSWER_URL;
  for (let i=0; i<currentSubscribers.length; i++) {
    if (currentSubscribers[i] == myAddress) {
      alreadySubscribed = true;
    }
  }
  if (alreadySubscribed == false) {
    currentSubscribers.push(myAddress);
    pool.hset('subscribers', 'channel_questions', JSON.stringify(currentSubscribers),()=>{})
    console.log('The AnswerService service was subscribed to channel_questions.');
  }
})

sync_messages(pool);

app.use('/create',createRouter);
app.use('/getanswers', getRouter);
app.use('/bus', busRouter);

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

module.exports = app;
