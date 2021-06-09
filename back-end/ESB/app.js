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
const redis_pool = require('redis-connection-pool');

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
app.use(bodyParser.json());

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
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const status = err.status || 500;
  res.status(status);
  const message = status >= 500 ? "Something's wrong": err.message;
  const expose = status >= 500 && req.app.get('env') === 'development';
  res.send({message:expose ? message + '\n\n' + err.stack : message});
});

// Redis connection
const TotalConnections = 10;
const pool = redis_pool('myRedisPool', {
  host: process.env.REDIS_HOST,   // localhost
  port: process.env.REDIS_PORT,   // Redis Port: 6379
  maxclients: TotalConnections,
});
console.log('Connected to Redis');

// initialize message queue and channels to empty
pool.hset('bus', 'messages', JSON.stringify([]), ()=>{});
pool.hset('channel1', 'subscribers', JSON.stringify([]), ()=>{});
pool.hset('channel2', 'subscribers', JSON.stringify([]), ()=>{});

// endpoints
app.post('/bus', async (req, res) => {
  const event = req.body.event;
  // accepted message's destination channel
  // (channel1 or channel2)
  const channel = req.body.channel;
  let currentMessages;
  let newMessage = {};
  // save message to shared message queue
  pool.hget('bus', 'messages', async (err, data) => {
    currentMessages = JSON.parse(data);
    newMessage = {
      'id': currentMessages.length + 1,
       event, // store whole object (event + destination channel)
      'timestamp': Date.now()
    }
    currentMessages.push(newMessage);
    pool.hset('bus', 'messages', JSON.stringify(currentMessages), () => {
      // broadcast new message only to the appropriate subscribers
      pool.hget('subscribers', channel, (err, data) => {
        let subscribers = json.parse(data);
        for (let i=0; i<subscribers.length; i++) {
          axios.post(subscribers[i], newMessage).then(resp => {
            console.log(subscribers[i], resp["data"]);
          }).catch(e => {
            console.log(subscribers[i], {"status" : "lost connection"});
          });
        }
        res.send({"status": "ok"})
      });
    });
  });
});

app.get('/', (req,res) => {
  res.send({'serverStatus':'running'});
});

app.listen(4200, () => {
  console.log('HTTP Server running on port 4200');
});

module.exports = app;
