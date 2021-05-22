const {AScreate, ASget} = require( "../services/AnswerService" );

module.exports = {
    async create(req,res,next){
      try {
        // we only pass the body object, not the req object
        const createdAns = await AScreate(req.body);
        return res.send(createdAns);
      }
      catch (err => next(err));
    },
    async getall(req,res,next){
      try {
        const returnedAns = await ASget(req.params.questionId);
        return res.send(returnedAns);
      }
      catch (err => next(err));
    }
}
