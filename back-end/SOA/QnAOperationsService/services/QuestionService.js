const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const DataLayerUrl = 'http://localhost:' + process.env.DATA_PORT + '/question/'

module.exports = {
    async QScreate(question){
      try {
        let result = await axios.post(DataLayerUrl + 'create', question);
        return {success: true, body: result.data};
      }
      catch (err) {
          err.status = err.response.status;
          return {success: false, error: err};
      }
    },
    async QSgetall(params){
      try {
        const result = await axios.get(DataLayerUrl +`get/${params.id}`);
        return {success: true, body: result.data};
      }
      catch(err) {
        //console.log(err);
        err.status = err.response.status;
        return {success: false, error: err};
      }
    },
    async QSgetfiltered(params){
      try {
        const result = await axios.get(DataLayerUrl + 'getfiltered', { params: { params } });
        return {success: true, body: result};
      }
      catch (err){
        return {success: false, error: err};
      }
    }
}
