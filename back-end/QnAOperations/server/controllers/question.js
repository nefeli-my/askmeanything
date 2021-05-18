const models = require('../models');
const User = models.User;
const Question = models.Question;

module.exports = {
    async create(req, res, next) {
        let question = req.body;
        const user = await User.findOne({
            where:{
                   username: req.user.username
            }
        })
            .catch(err => next(err))
        question.author = user.getDataValue('id')
        await Question.create(
                question,
                {
                    returning: true,
                    plain: true
                }
            )
            .then( data => res.status(200).send(data))
            .catch(err => next(err))
    },
    async findAll(req, res, next){
        await Question.findAll({limit: 10, order: [['createdAt', 'DESC']], raw: true})
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
    }
}