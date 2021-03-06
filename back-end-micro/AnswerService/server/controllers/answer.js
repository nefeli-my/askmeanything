const models = require('../models');
const Answer = models.Answer;
const User = models.User;
const Question = models.Question;
const Keyword = models.Keyword;
const axios = require("axios");
const busURL = process.env.BUS_URL + '/bus';

// create answer and get answers controllers
// implemented using the Sequelize ORM
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
            .then(answer => {
                res.status(200).send(answer);
                return answer;
            })
            .catch(err => next(err))
            .then(answer => {
                axios.post(busURL,{
                    event : {
                        action: 'createAnswer',
                        answer: answer
                    },
                    channel: 'channel_answers'
                })

            })
            .catch(err => console.log(err))
    },
    async findAll(req,res,next){
        try {
            const questionId = req.params.id;
            const question = await Question.findByPk(questionId,
            {
              order: [
                   [Answer, 'createdAt', 'desc']],
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
                  },
                  {
                      model: User,
                      as: 'Author',
                      attributes: ['username'],
                  }
              ],
            });
            if(question)
                res.status(200).send(question)
            else
                res.status(404).send({msg:'Question with given id doesn\'t exist.'})
        }catch(err){
            next(err)
        }
    },
    async findAllRestricted(req,res,next){
        try {
            const questionId = req.params.id;
            const question = await Question.findByPk(questionId,
                {
                    order: [[Answer, 'createdAt', 'desc']],
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
                        },
                        {
                            model: User,
                            as: 'Author',
                            attributes: ['username'],
                        }
                    ]
                });
            const questions = await Question.findAll({
                limit: 10,
                order: [['createdAt', 'DESC']],
                raw: true
            })
            let found = false;
            if(question) {
                for (x of questions) {
                    if (x.id === question.id)
                        found = true;
                }
            }
            if(!question)
                res.status(404).send({msg:'Question with given id doesn\'t exist.'})
            else if(!found)
                res.status(400).send({msg:'You must be logged in to view this questions and its answers!'});
            else
                res.status(200).send(question)
        }catch(err){
            next(err)
        }
    }
}
