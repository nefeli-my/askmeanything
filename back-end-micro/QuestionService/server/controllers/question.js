const models = require('../models');
const User = models.User;
const Question = models.Question;
const Keyword = models.Keyword;
const Keyword_Question = models.Question_Keyword;
const axios = require("axios");
const busURL = process.env.BUS_URL + '/bus';

module.exports = {
    async create(req, res, next) {
        try {
            let question = {};
            question.title = req.body.title;
            question.body = req.body.body;
            const keywords =  req.body.keywords;
            const user = await User.findOne({
                where: {
                    username: req.user.username
                }
            })
                .catch(err => next(err))
            question.author = user.getDataValue('id')
            let createdQ = await Question.create(
                question,
            )
            for (x of keywords) {
                const keyw = await Keyword.findOrCreate(
                    {
                        where: {
                            word: x
                        }
                    })
                await createdQ.addKeyword(keyw[0])
            }
            const keyws = await createdQ.getKeywords(
                {
                    attributes: ['word'],
                    through: {
                        model: Keyword_Question,
                        attributes: []
                    }
                }
            );
            createdQ = createdQ.dataValues;
            createdQ.keywords = keyws;
            res.status(200).send(createdQ);
            await axios.post(busURL,{
                    event : {
                        action: 'createQuestion',
                        question: createdQ
                    },
                    channel: 'channel_questions'
                })
                .catch(error => console.log(error))
        }
        catch(err){
            next(err)
        }
    }
}
