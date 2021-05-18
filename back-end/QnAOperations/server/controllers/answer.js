const models = require('../models');
const Answer = models.Answer;
const User = models.User;
const Question = models.Question;

module.exports = {
    async create(req,res,next){
        let answer = req.body;
        const user = await User.findOne({
            where:{
                username: req.user.username
            }
        })
            .catch(err => next(err))
        answer.userId = user.getDataValue('id')
        await Answer.create(
            answer,
            {
                returning: true,
                plain: true
            }
        )
            .then(answer => res.status(200).send(answer))
            .catch(err => next(err))
    },
    async findAll(req,res,next){
        try {
            const questionId = req.params.questionId;
            const question = await Question.findByPk(questionId);
            const answers = await question.getAnswers({raw: true})
            res.status(200).send(answers)
        }catch(err){
            next(err)
        }
    }
}