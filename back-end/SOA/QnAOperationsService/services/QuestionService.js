const axios = require('axios');
const DataLayerUrl = 'http://localhost:' + process.env.DATA_PORT + '/question/'

module.exports = {
    async QScreate(question){
      try {
        const result = await axios.post(DataLayerUrl + 'create', question);
        return {success: true, body: result};
      }
      catch {
        return {success: false, error: err};
      }
    },
    async QSgetall(){
      try {
        const result = await axios.get(DataLayerUrl + 'getall');
        return {success: true, body: result};
      }
      catch {
        return {success: false, error: err};
      }
    },
    async QSgetfiltered(params){
      try {
        const result = await axios.get(DataLayerUrl + 'getfiltered', { params: { params } });
        return {success: true, body: result};
      }
      catch {
        return {success: false, error: err};
      }
    }
}
