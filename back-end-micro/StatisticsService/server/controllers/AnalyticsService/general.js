const models = require('../../models');
const moment = require('moment');
const {Sequelize,Op} = require('sequelize');
const Answer = models.Answer;
const Question = models.Question;
const Keyword = models.Keyword;
const Keyword_Question = models.Question_Keyword;

// questionsPerDay, answersPerDay, questionsPerKeyword controllers
// (for generalized statistics)
// Sequelize ORM used
module.exports = {
    async questionsPerDay(req, res, next) {
        try {
            const tz = req.params.tz;
            const questions = await Question.findAll({
                attributes: [
                    [Sequelize.literal(`DATE("createdAt" at time zone '${tz}' at time zone 'utc')`), 'date'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['date'],
                limit: 8,
                order: [[Sequelize.literal(`DATE("createdAt" at time zone '${tz}' at time zone 'utc')`), 'DESC']],
                raw: true
            });
            const criticalMoment =  moment().startOf('day').subtract(7, 'days');
            const result = new Array(8).fill(0);
            const nowMoment = moment();
            for (x of questions){
                const xMoment = moment(x.date);

                if(xMoment >= criticalMoment && xMoment < nowMoment){

                    const index = xMoment.diff(criticalMoment,'days');
                    result[index] = x.count;
                }
            }
            res.status(200).send(result);
        } catch (err) {
            next(err)
        }
    },
    async answersPerDay(req, res, next) {
        try {
            const tz = req.params.tz;
            const answers = await Answer.findAll({
                attributes: [
                    [Sequelize.literal(`DATE("createdAt" at time zone '${tz}' at time zone 'utc')`), 'date'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['date'],
                limit: 8,
                order: [[Sequelize.literal(`DATE("createdAt" at time zone '${tz}' at time zone 'utc')`), 'DESC']],
                raw: true
            });
            const criticalMoment =  moment().startOf('day').subtract(7, 'days');
            const result = new Array(8).fill(0);
            const nowMoment = moment();

            for (x of answers){
                const xMoment = moment(x.date);

                if(xMoment >= criticalMoment && xMoment < nowMoment){

                    const index = xMoment.diff(criticalMoment,'days');
                    result[index] = x.count;
                }
            }
            res.status(200).send(result);
        } catch (err) {
            next(err)
        }
    },
    async questionsPerKeyword(req, res, next) {
        try {
            const questions = await Keyword_Question.findAll({
                include: [
                    {
                        model: Keyword,
                        attributes: ['word']
                    }
                ],
                attributes: [
                    'keywordId',
                    [Sequelize.literal(`COUNT(*)`), 'count'],
                    [Sequelize.literal(`"Keyword"."word"`), 'word']
                ],
                group: ['keywordId','id'],
                limit: 20,
                order: [[Sequelize.literal(`COUNT(*)`), 'DESC']],
                raw:true
            });
            res.status(200).send(questions);
        } catch (err) {
            next(err)
        }
    }

}
