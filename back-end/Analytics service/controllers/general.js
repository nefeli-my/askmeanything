const {questionsPerDay, answersPerDay, questionsPerKeyword} = require('../AnalyticsService');

module.exports = {
    async qPerDay(req, res, next) {
        try {
            const results = await questionsPerDay();
            if(results.error) {
                let err = new Error(results.error.response.data.msg);
                err.status = results.error.status;
                throw err;
            }
            return res.send(results.body);
        }
        catch (err) {
            next(err);
        }
    },
    async aPerDay(req, res, next) {
        try {
            const results = await answersPerDay();
            if(results.error) {
                let err = new Error(results.error.response.data.msg);
                err.status = results.error.status;
                throw err;
            }
            return res.send(results.body);
        }
        catch (err) {
            next(err);
        }
    },
    async qPerKeyword(req, res, next) {
        try {
            const results = await questionsPerKeyword();
            if(results.error) {
                let err = new Error(results.error.response.data.msg);
                err.status = results.error.status;
                throw err;
            }
            return res.send(results.body);
        }
        catch (err) {
            next(err);
        }
    },

};
