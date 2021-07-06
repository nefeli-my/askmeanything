const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
const app = express();
const getQuestionRouter = require('./routes/question/get');
const getAnswerRouter = require('./routes/answer/get');
const answerRouter = require('./routes/answer/create');
const questionRouter = require('./routes/question/create');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: process.env.FRONT_URL}));
app.use(bodyParser.json());

//4 self-explanatory routes
app.use('/createquestion',questionRouter);
app.use('/createanswer', answerRouter);
app.use('/getanswers', getAnswerRouter);
app.use('/getquestions', getQuestionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
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
