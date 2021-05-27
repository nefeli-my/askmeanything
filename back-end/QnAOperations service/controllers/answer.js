const {Acreate, Aget, AgetRestricted} = require( "../QnAService" );

module.exports = {
    async create(req,res,next){
      try {
        req.body.user = req.user;
        const createdAns = await Acreate(req.body);
        if (createdAns.error) {
            let err = new Error(createdAns.error.response.data.msg);
            err.status = createdAns.error.response.status;
            throw err;
        }
        return res.send(createdAns.body.data);
      }
      catch (err) {
          next(err);
      }
      },
    async getall(req,res,next) {
        try {
            const returnedAns = await Aget(req.params.questionId);
            if (returnedAns.error) {
                let err = new Error(returnedAns.error.response.data.msg);
                err.status = returnedAns.error.response.status;
                throw err;
            }
            return res.send(returnedAns.body.data);
        } catch (err) {
            next(err);
        }
    },
    async getallRestricted(req,res,next) {
        try {
            const returnedAns = await AgetRestricted(req.params.questionId);
            if (returnedAns.error) {
                let err = new Error(returnedAns.error.response.data.msg);
                err.status = returnedAns.error.response.status;
                throw err;
            }
            return res.send(returnedAns.body.data);
        } catch (err) {
            next(err);
        }
    }
}
