const {QScreate, QSgetall, QSgetfiltered} = require( "../services/QuestionService" );

module.exports = {
    async create(req, res, next) {
      try {
        // we only pass the body object, not the req object
        const createdQues = await QScreate(req.body);
        if(createdQues.error) {
            let err = new Error(createdQues.error.response.data.msg);
            err.status = createdQues.error.status;
            throw err;
        }
        return res.send(createdQues.body);
      }
      catch (err) {
          next(err);
      }
    },
    async getall(req, res, next){
      try {
        const returnedQues = await QSgetall(req.params);
          if(returnedQues.error) {
              let err = new Error(returnedQues.error.response.data.msg);
              err.status = returnedQues.error.status;
              throw err;
          }
          return res.send(returnedQues.body);
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
