const models = require('../../models');
const {Op} = require("sequelize");
const User = models.User;
const Question = models.Question;
const Keyword = models.Keyword;
const Keyword_Question = models.Question_Keyword;

module.exports = {
    async create(req, res, next) {
        try {
            let question = {};
            question.title = req.body.title;
            question.body = req.body.body;
            const keywords = req.body.keywords;
            const user = await User.findOne({
                where: {
                    username: req.body.user.username
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
        }
        catch(err){
            next(err)
        }
    },
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
          
      const questions =
          await Question.findAll({
            include: [
              {
                model: User,
                as: 'Author',
                attributes: ['username'],
                where: whereObjU
              },
              {
                model: Keyword,
                attributes: ['word'],
                through: {
                    model: Keyword_Question,
                    attributes: []
                },
                where: whereObjK
              }],
              where: whereObjD
          })
            .catch(err => next(err))
        res.status(200).send(questions)
      }
  }
