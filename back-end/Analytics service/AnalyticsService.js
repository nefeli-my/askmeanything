const axios = require('axios');

const DataLayerUrl = process.env.DATA_URL;

//functions to retrieve the appropriate data from data access layer
module.exports = {
    async questionsPerDay(tz, user){
        try {
            let result = {};
            console.log(tz)
            if(user){
                result = await axios.get(DataLayerUrl +'/analytics'+`/user/questions/${user}/` + tz.replace('/','%2F'));
            }
            else {
                result = await axios.get(DataLayerUrl + '/analytics' + '/general/questions/' + tz.replace('/','%2F'));
            }
            return {success: true, body: result.data};
        }
        catch (err) {
            console.log(err)
            err.status = err.response.status;
            return {success: false, error: err};
        }
    },
    async answersPerDay(tz, user){
        try {
            let result = {};
            if(user){
                result = await axios.get(DataLayerUrl +'/analytics'+`/user/answers/${user}/` + tz.replace('/','%2F'));
            }
            else {
                result = await axios.get(DataLayerUrl + '/analytics' + '/general/answers/' + tz.replace('/','%2F'));
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
