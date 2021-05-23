const {Acreate, Aget} = require( "../QnAService" );

module.exports = {
    async create(req,res,next){
      try {
        const createdAns = await Acreate(req.body);
        return res.send(createdAns);
      }
      catch (err) {
          next(err);
      }
      },
    async getall(req,res,next){
      try {
        const returnedAns = await Aget(req.params.questionId);
        return res.send(returnedAns);
      }
      catch (err) {
          next(err);
      }
    }
}
