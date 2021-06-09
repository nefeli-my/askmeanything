const models = require('../models');
const {Op} = require("sequelize");
const User = models.User;
const Question = models.Question;
const Keyword = models.Keyword;
const Keyword_Question = models.Question_Keyword;
const Answer = models.Answer;

module.exports = {
    async findAll(req, res, next){
      const questions =
        await Question.findAll({
          order: [['createdAt', 'DESC']],
          offset: req.params.id,
          limit: 10,
          include: [
            {
              model: User,
              as: 'Author',
              attributes: ['username']
            },
            {
                model: Keyword,
                attributes: ['word'],
                through: {
                    model: Keyword_Question,
                    attributes: []
                }
            }]
        })
          .catch(err => next(err))
      res.status(200).send(questions)
    },
    async findAllRestricted(req, res, next){
        const questions =
            await Question.findAll({
                limit: 10,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        as: 'Author',
                        attributes: ['username']
                    },
                    {
                        model: Keyword,
                        attributes: ['word'],
                        through: {
                            model: Keyword_Question,
                            attributes: []
                        }
                    }]
            })
                .catch(err => next(err))
        res.status(200).send(questions)
    },
    async findFiltered(req, res, next){
      let author = req.query.author !== undefined;
      let keyword = req.query.keyword !== undefined;
      let start_date = req.query.start_date !== undefined;
      //format where object
      let whereObjU = {};
      let whereObjK = {};
      let whereObjD = {};
      if(author)
          whereObjU.username = req.query.author;
      if(keyword)
          whereObjK.word = req.query.keyword;
      if(start_date)
          whereObjD.createdAt = {
            [Op.gte]: Date.parse(req.query.start_date),
            [Op.lte] : Date.parse(req.query.end_date)
          }

      const questions_initial =
          await Question.findAll({
            include: [
              {
                model: User,
                as: 'Author',
                attributes: [],
                where: whereObjU
              },
              {
                model: Keyword,
                attributes: [],
                through: {
                    model: Keyword_Question,
                    attributes: []
                },
                where: whereObjK.word !== undefined ? whereObjK : null
              }
              ],
              where: whereObjD,
              attributes: ['id'],
          })
            .catch(err => next(err))
        let array_ids = questions_initial.map(x => x.id);
        const questions = await Question.findAll({
            where: {
                id: array_ids
            },
            include: [
                {
                    model: User,
                    as: 'Author',
                    attributes: ['username'],
                },
                {
                    model: Keyword,
                    attributes: ['word'],
                    through: {
                        model: Keyword_Question,
                        attributes: []
                    }
                }
            ]
        } )
            .catch(err => next(err))
        res.status(200).send(questions)
      },
    async findByUser(req, res, next){
        const user = await User.findOne({
            where: {
                username: req.user.username
            }
        })
            .catch(err => next(err))
        const id = user.getDataValue('id')
        let questions =
            await Question.findAll({
                include: [
                    {
                        model: User,
                        as: 'Author',
                        attributes: ['username'],
                        where:{
                            username: req.user.username
                        }
                    },
                    {
                        model: Keyword,
                        attributes: ['word'],
                        through: {
                            model: Keyword_Question,
                            attributes: []
                        }
                    }]
            })
                .catch(err => next(err))
        let quest_answ = await Question.findAll({
            include: [
                {
                    model: Answer,
                    attributes: [],
                    where: {
                        userId: id
                    },
                },
                {
                    model: User,
                    as: 'Author',
                    attributes: ['username']
                },
                {
                    model: Keyword,
                    attributes: ['word'],
                    through: {
                        model: Keyword_Question,
                        attributes: []
                    }
                }]
        })
            .catch(err => next(err))
        let all = {
            made: questions,
            answered: quest_answ
        }
        res.status(200).send(all)
    },
  }
