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
                username: req.body.user
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
            const questionId = req.params.id;
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
                }
              ],
            });
            res.status(200).send(question)
        }catch(err){
            next(err)
        }
    },
    async findAllRestricted(req,res,next){
        try {
            const questionId = req.params.id;
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
                    ]
                });
            const questions = await Question.findAll({
                limit: 10,
                order: [['createdAt', 'DESC']],
                raw: true
            })
            let found = false;
            for(x of questions){
                if(x.id === question.id)
                    found = true;
            }
            if(!found)
                res.status(400).send({msg:'You must be logged in to view this questions and its answers!'});
            else
                res.status(200).send(question)
        }catch(err){
            next(err)
        }
    }
}
