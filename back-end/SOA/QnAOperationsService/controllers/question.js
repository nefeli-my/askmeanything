const {QScreate, QSgetall, QSgetfiltered} = require( "../services/QuestionService" );

module.exports = {
    async create(req, res, next) {
      try {
        // we only pass the body object, not the req object
        const createdQues = await QScreate(req.body);
        return res.send(createdQues);
      }
      catch (err) {
          next(err);
      }
    },
    async getall(req, res, next){
      try {
        const returnedQues = await QSgetall();
        return res.send(returnedQues);
      }
      catch (err) {
          next(err);
      }
      },
    async getfiltered(req, res, next){
      try {
        const returnedQues = await QSgetfiltered(req.params);
        return res.send(returnedQues);
      }
      catch (err) {
          next(err);
      }
    }
  }
