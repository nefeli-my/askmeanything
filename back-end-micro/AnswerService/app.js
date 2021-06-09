const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createRouter = require('./routes/create');
const getRouter = require('./routes/get');
const busRouter =  require('./routes/bus')
const passport = require('passport');
const app = express();
const redis_pool = require('redis-connection-pool');
const dotenv = require('dotenv');
const cors = require('cors');
const transaction = require('./middlewares/transaction');
const db = require('./server/models/index');

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
app.use(transaction({ sequelize: db.sequelize }));

// Redis connection
const TotalConnections = 10;
const pool = redis_pool('myRedisPool', {
  host: process.env.REDIS_HOST,   // localhost
  port: process.env.REDIS_PORT,   // Redis Port: 6379
  maxclients: TotalConnections,
});
console.log('Connected to Redis');

pool.hget('subscribers', 'channel_users', async (err, data) => {
  let currentSubscribers = JSON.parse(data);
  let alreadySubscribed = false;
  let myAddress = 'http://localhost:8004/bus';
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

app.use('/create',createRouter);
app.use('/getquestion', getRouter);
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


//app.listen(8000);
module.exports = app;
