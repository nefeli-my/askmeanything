const {questionsPerDay, answersPerDay, questionsPerKeyword} = require('../AnalyticsService');

//controllers for calling the corresponding function in AnalyticsService concerning the based upon signed-in user statistics
module.exports = {
    async qPerDay(req, res, next) {
        try {
            const results = await questionsPerDay(req.params.tz, req.user);
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
            const results = await answersPerDay(req.params.tz, req.user);
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
            const results = await questionsPerKeyword(req.user);
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
