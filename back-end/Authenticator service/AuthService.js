const axios = require('axios');

const DataLayerUrl = process.env.DATA_URL;

module.exports = {
    async Usercreate(user){
        try {
            let result = await axios.post(DataLayerUrl +'/user'+'/create',user);
            return {success: true, body: result.data, status: result.status};
        }
        catch (err) {
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async Userget(username){
        try {
            let result = await axios.get(DataLayerUrl +'/user'+`/get/${username}`);
            return {success: true, body: result.data};
        }
        catch (err) {
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async Uservalidate(user){
        try {
            const result = await axios.post(DataLayerUrl +'/user'+'/validate',user);
            return {success: true, body: result.data, status: result.status};
        }
        catch(err) {
            err.status = err.response.status;
            return {success: false, body: false};
        }
    },
    async Userupdate(user){
        try {
            const result = await axios.post(DataLayerUrl +'/user'+'/update', user);
            return {success: true, body: result, status: result.status};
        }
        catch (err){
            return {success: false, error: err};
        }
    }
}
