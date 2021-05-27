const models = require('../../models');
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
            const keywords = req.body.keywords.substring(1,req.body.keywords.length -1).split(",")
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
                        }/*,
                        include:[{
                            model: Keyword_Question,
                            attributes: []
                        }

                        ]*/
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
          //offset: req.params.id,
          limit: req.params.id,
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
      /*
      if (!author && !keyword && start_date) {

      }
      */
      if (!author && keyword && !start_date) {
        const questions =
          await Question.findAll({
            include: [
              {
                model: User,
                as: 'Author',
                attributes: ['username']
              },
              {
                model: Keyword,
                attributes: ['word'],
                where: { word: req.query.keyword },
                through: {
                    model: Keyword_Question,
                    attributes: []
                  }
              }]
          })
            .catch(err => next(err))
        res.status(200).send(questions)
      }
      /*
      if (!author && keyword && start_date) {

      }
      */
      if (author && !keyword && !start_date) {
      const questions =
        await Question.findAll({
          include: [
            {
              model: User,
              as: 'Author',
              attributes: ['username'],
              where: { username: req.query.author },
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
      }
      /*
      if (author && !keyword && start_date) {

      }
      */
      if (author && keyword && !start_date) {
        const questions =
          await Question.findAll({
            include: [
              {
                model: User,
                as: 'Author',
                attributes: ['username'],
                where: { username: req.query.author },
              },
              {
                model: Keyword,
                attributes: ['word'],
                where: { word: req.query.keyword },
                through: {
                    model: Keyword_Question,
                    attributes: []
                }
              }]
          })
            .catch(err => next(err))
        res.status(200).send(questions)
      }
      /*
      if (author && keyword && start_date) {

      }
      */
    }
  }
