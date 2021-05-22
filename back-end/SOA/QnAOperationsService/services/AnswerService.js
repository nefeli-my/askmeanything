const axios = require('axios');
const DataLayerUrl = 'http://localhost:' + process.env.DATA_PORT + '/answer/'

module.exports = {
    async AScreate(answer){
      try {
        const result = await axios.post(DataLayerUrl + 'create', answer);
        return {success: true, body: result};
      }
      catch {
        return {success: false, error: err};
      }
    },
    async ASget(question_id){
      try {
        const result = await axios.get(DataLayerUrl + 'get', { params: { question_id } });
        return {success: true, body: result};
      }
      catch {
        return {success: false, error: err};
      }
    }
}
