const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const DataLayerUrl = 'http://localhost:' + process.env.DATA_PORT + '/user/'

module.exports = {
    async Usercreate(user){
        try {

            let result = await axios.post(DataLayerUrl + 'create',user);
            return {success: true, body: result.data};
        }
        catch (err) {
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async Uservalidate(user){
        try {
            const result = await axios.post(DataLayerUrl +'validate',user);
            return {success: true, body: result.data};
        }
        catch(err) {
            //console.log(err);
            err.status = err.response.status;
            return {success: false, body: false};
        }
    },
    async Userupdate(user){
        try {
            const result = await axios.post(DataLayerUrl + 'update', user);
            return {success: true, body: result};
        }
        catch (err){
            return {success: false, error: err};
        }
    }
}
