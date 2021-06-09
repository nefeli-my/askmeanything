const models = require('../../models');
const moment = require('moment');
const {Sequelize,Op} = require('sequelize');
const User = models.User;
const Question = models.Question;
const Keyword = models.Keyword;
const Keyword_Question = models.Question_Keyword;
const Answer = models.Answer;

module.exports = {
    async questionsPerDay(req, res, next) {
        try {
            const user = await User.findOne({
                where:{
                    username: req.user
                },
                raw: true
            })
            const author = user.id;
            const questions = await Question.findAll({
                attributes: [
                    [Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                where: {
                    author: author
                }
                ,
                group: ['date'],
                limit: 7,
                order: [[Sequelize.literal(`DATE("createdAt")`), 'DESC']],
                raw: true
            });
            const criticalMoment =  moment().startOf('day').subtract(7, 'days');
            const result = new Array(7).fill(0);
            const nowMoment = moment();
            for (x of questions){
                const xMoment = moment(x.date);

                if(xMoment > criticalMoment && xMoment < nowMoment){
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
            const user = await User.findOne({
                where:{
                    username: req.user
                },
                raw: true
            })
            const author = user.id;
            const answers = await Answer.findAll({
                attributes: [
                    [Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                where: {
                    userId: author
                }
                ,
                group: ['date'],
                limit: 7,
                order: [[Sequelize.literal(`DATE("createdAt")`), 'DESC']],
                raw: true
            });
            const criticalMoment =  moment().startOf('day').subtract(7, 'days');
            const result = new Array(7).fill(0);
            const nowMoment = moment();
            for (x of answers ){
                const xMoment = moment(x.date);

                if(xMoment > criticalMoment && xMoment < nowMoment){
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
            const user = await User.findOne({
                where:{
                    username: req.user
                },
                raw: true
            })
            const author = user.id;
            const questions = await Keyword_Question.findAll({
                include: [
                    {
                        model: Keyword,
                        attributes: ['word']
                    },
                    {
                        model: Question,
                        where: {
                            author: author
                        },
                        attributes: []
                    }
                ],
                attributes: [
                    'keywordId',
                    [Sequelize.literal(`COUNT(*)`), 'count'],
                    [Sequelize.literal(`"Keyword"."word"`), 'word']
                ],
                group: ['keywordId','Keyword.id'],
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
