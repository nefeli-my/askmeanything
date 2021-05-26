const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const DataLayerUrl = 'http://localhost:' + process.env.DATA_PORT;

module.exports = {
    async questionsPerDay(user){
        try {
            let result = {};
            if(user){
                result = await axios.get(DataLayerUrl +'/analytics'+`/user/questions/${user}`);
            }
            else {
                result = await axios.get(DataLayerUrl + '/analytics' + '/general/questions');
            }
            return {success: true, body: result.data};
        }
        catch (err) {
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async answersPerDay(user){
        try {
            let result = {};
            if(user){
                result = await axios.get(DataLayerUrl +'/analytics'+`/user/answers/${user}`);
            }
            else {
                result = await axios.get(DataLayerUrl + '/analytics' + '/general/answers');
            }
            return {success: true, body: result.data};
        }
        catch (err) {
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async questionsPerKeyword(user){
        try {
            let result = {};
            if(user){
                result = await axios.get(DataLayerUrl +'/analytics'+`/user/keywords/${user}`);
            }
            else {
                result = await axios.get(DataLayerUrl + '/analytics' + '/general/keywords');
            }
            return {success: true, body: result.data};
        }
        catch (err) {
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
}
