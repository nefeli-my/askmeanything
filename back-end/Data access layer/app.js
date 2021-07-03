const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const userRouter = require('./routes/AuthService/user');
const getQuestionRouter = require('./routes/QnAService/getQuestions');
const getAnswerRouter = require('./routes/QnAService/getAnswers');
const answerRouter = require('./routes/QnAService/createAnswer');
const questionRouter = require('./routes/QnAService/createQuestion');
const analyticsRouter = require('./routes/Analytics');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const transaction = require('./middlewares/transaction');
const db = require('./server/models/index');

dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(transaction({ sequelize: db.sequelize }));

app.use('/user', userRouter);
app.use('/question/create',questionRouter);
app.use('/answer/create', answerRouter);
app.use('/answer/get', getAnswerRouter);
app.use('/question/get', getQuestionRouter);
app.use('/analytics/', analyticsRouter);


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
