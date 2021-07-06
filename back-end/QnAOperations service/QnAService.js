const axios = require('axios');

const DataLayerUrl = process.env.DATA_URL;

//functions to retrieve the appropriate data from data access layer
module.exports = {
    async Qcreate(question){
      try {
        let result = await axios.post(DataLayerUrl + '/question' + '/create', question);
        return {success: true, body: result.data};
      }
      catch (err) {
          err.status = err.response.status;
          return {success: false, error: err};
      }
    },
    async Qgetall(params){
      try {
        const result = await axios.get(DataLayerUrl + '/question' +`/get/${params.offset}`);
        return {success: true, body: result.data};
      }
      catch(err) {
        err.status = err.response.status;
        return {success: false, error: err};
      }
    },
    async QgetallRestricted(){
        try {
            const result = await axios.get(DataLayerUrl + '/question' +`/get/unsigned`);
            return {success: true, body: result.data};
        }
        catch(err) {
            //console.log(err);
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async Qgetfiltered(qparams){
      try {
        const result =
          await axios.get(DataLayerUrl + '/question/get/filters',
                      {
                        params: {
                          author: qparams.author,
                          keyword: qparams.keyword,
                          start_date: qparams.start_date,
                          end_date: qparams.end_date
                        }
                      });
        return {success: true, body: result.data};
      }
      catch (err){
        return {success: false, error: err};
      }
    },
    async Qgetbyuser(user){
        try {
            const result =
                await axios.get(DataLayerUrl + `/question/get/user/${user}`);
            return {success: true, body: result.data};
        }
        catch (err){
            return {success: false, error: err};
        }
    },
    async Acreate(answer){
      try {
        const result = await axios.post(DataLayerUrl + '/answer' + '/create', answer);
        return {success: true, body: result};
      }
      catch(err) {
        return {success: false, error: err};
      }
    },
    async Aget(questionId){
      try {
        const result = await axios.get(DataLayerUrl + '/answer'  +`/get/${questionId}`);
        return {success: true, body: result};
      }
      catch(err) {
        return {success: false, error: err};
      }
    },
    async AgetRestricted(questionId){
        try {
            const result = await axios.get(DataLayerUrl + '/answer'  +`/get/unsigned/${questionId}`);
            return {success: true, body: result};
        }
        catch(err) {
            return {success: false, error: err};
        }
    }
}
