const models = require('../../models');
const Answer = models.Answer;
const User = models.User;
const Question = models.Question;
const Keyword = models.Keyword;

module.exports = {
    async create(req,res,next){
        let answer = req.body;
        const user = await User.findOne({
            where:{
                username: req.body.user.username
            }
        })
            .catch(err => next(err))
        answer.userId = user.getDataValue('id')
        await Answer.create(
            answer,
            {
                returning: true,
                plain: true,
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Question
                    }
                ]
            }
        )
            .then(answer => res.status(200).send(answer))
            .catch(err => next(err))
    },
    async findAll(req,res,next){
        try {
            const questionId = req.query.questionId;
            const question = await Question.findByPk(questionId,
            {
              include: [
                {
                  model: Answer,
                  attributes: ['id', 'body', 'createdAt'],
                  include: [
                    {
                      model: User,
                      attributes: ['id', 'username']
                    }
                  ]
                },
                {
                  model: Keyword,
                  attributes: ['id', 'word'],
                  through: {
                    attributes: []
                  }
                }
              ],
            });
            res.status(200).send(question)
        }catch(err){
            next(err)
        }
    }
}
