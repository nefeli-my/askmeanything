const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const redis_pool = require('redis-connection-pool');
const app = express();
const axios = require("axios");
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: [process.env.AUTH_URL, process.env.QUESTION_URL, process.env.ANSWER_URL]}));

// Redis connection
const TotalConnections = 10;
const pool = redis_pool('myRedisPool', {
  url: process.env.REDIS_URL,
  maxclients: TotalConnections,
});
console.log('Connected to Redis');

// initialize message queue and channels to empty
pool.hget('bus', 'messages', async (err, data) => {
  if(!data){
    pool.hset('bus', 'messages', JSON.stringify([]), ()=>{});
  }
})

pool.hget('publishers', 'channel_users', async (err, data) => {
  if(!data){
    pool.hset('publishers', 'channel_users', JSON.stringify([]), ()=>{});
  }
})

pool.hget('publishers', 'channel_questions', async (err, data) => {
  if(!data){
    pool.hset('publishers', 'channel_questions', JSON.stringify([]), ()=>{});
  }
})

pool.hget('publishers', 'channel_answers', async (err, data) => {
  if(!data){
    pool.hset('publishers', 'channel_answers', JSON.stringify([]), ()=>{});
  }
})


pool.hget('subscribers', 'channel_users', async (err, data) => {
  if(!data){
    pool.hset('subscribers', 'channel_users', JSON.stringify([]), ()=>{});
  }
})

pool.hget('subscribers', 'channel_questions', async (err, data) => {
  if(!data){
    pool.hset('subscribers', 'channel_questions', JSON.stringify([]), ()=>{});
  }
})

pool.hget('subscribers', 'channel_answers', async (err, data) => {
  if(!data){
    pool.hset('subscribers', 'channel_answers', JSON.stringify([]), ()=>{});
  }
})


// endpoints
app.post('/bus', async (req, res) => {
  const event = req.body.event;
  console.log(event)
  // accepted message's destination channel
  const channel = req.body.channel;
  let currentMessages;
  let newMessage = {};
  // save message to shared message queue
  pool.hget('bus', 'messages', async (err, data) => {
    currentMessages = JSON.parse(data);
    newMessage = {
      'id': currentMessages.length + 1,
      event,
      channel,          // store whole object (event + destination channel)
      'timestamp': Date.now()
    }
    currentMessages.push(newMessage);
    pool.hset('bus', 'messages', JSON.stringify(currentMessages), () => {
      // broadcast new message only to the appropriate subscribers
      pool.hget('subscribers', channel, (err, data) => {
        let subscribers = JSON.parse(data);
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
