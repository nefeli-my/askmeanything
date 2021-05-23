const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const DataLayerUrl = 'http://localhost:' + process.env.DATA_PORT;

module.exports = {
    async Tokencreate(user){
        try {
            let result = await axios.post(DataLayerUrl +'/token'+'/create',{user: user});
            return {success: true, body: result.data};
        }
        catch (err) {
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async Tokenvalidate(user){
        try {
            const result = await axios.post(DataLayerUrl +'/token'+'/validate',user);
            return {success: true, body: result.data};
        }
        catch(err) {
            //console.log(err);
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async Tokendelete(user){
        try {
            const result = await axios.post(DataLayerUrl +'/token'+'/delete', user);
            return {success: true, body: result};
        }
        catch (err){
            return {success: false, error: err};
        }
    },
    async Usercreate(user){
        try {

            let result = await axios.post(DataLayerUrl +'/user'+'/create',user);
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
            const result = await axios.post(DataLayerUrl +'/user'+'/update', user);
            return {success: true, body: result};
        }
        catch (err){
            return {success: false, error: err};
        }
    }
}
