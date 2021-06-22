const {Qcreate, Qgetall, QgetallRestricted,Qgetfiltered, Qgetbyuser} = require( "../QnAService" );

module.exports = {
    async create(req, res, next) {
      try {
        req.body.user = req.user;
        const createdQues = await Qcreate(req.body);
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
        const returnedQues = await Qgetall(req.params);
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
    async getallRestricted(req, res, next){
        try {
            const returnedQues = await QgetallRestricted();
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
        const returnedQues = await Qgetfiltered(req.query);
        return res.send(returnedQues.body);
      }
      catch (err) {
          next(err);
      }
    },
    async getbyuser(req, res, next){
        try {
            const returnedQues = await Qgetbyuser(req.user);
            return res.send(returnedQues.body);
        }
        catch (err) {
            next(err);
        }
    }

  }
