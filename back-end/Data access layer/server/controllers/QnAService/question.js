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
            const keywords = req.body.keywords.split(",")
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
            createdQ = createdQ.dataValues
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
          offset: req.params.id,
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [{
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
      console.log('findFiltered');
      console.log(req.params.author);
      //let author = typeof req.params.author !== 'undefined';
      //let keyword = typeof req.params.keyword !== 'undefined';
      //let start_date = typeof req.params.start_date !== 'undefined';
      //let end_date = typeof req.params.end_date !== 'undefined';
      //console.log(author)
    /*
      if (!author && !keyword && start_date) {
        console.log('1')
        var query = {
          where: {
            createdAt: {
              // params may need some modification
              // to fit the Date() type
              [Op.lte]: req.params.end_date,
              [Op.gte]: req.params.start_date
            }
          }
        }
      }
      if (!author && keyword && !start_date) {
        console.log('2')
        var query = {
          where: {
            include: [{
              model: Keyword,
              where: { word: req.params.keyword  }
            }]
          }
        }
      }
      if (!author && keyword && start_date) {
        console.log('3')
        var query = {
          where: {
            include: [{
              model: Keyword,
              where: { word: req.params.keyword  }
            }],
            createdAt: {
              // params may need some modification
              // to fit the Date() type
              [Op.lte]: req.params.end_date,
              [Op.gte]: req.params.start_date
            }
          }
        }
      }
      if (author && !keyword && !start_date) {
        console.log('4');
        var query = {
          where: {
            author: req.params.author
          }
        }
      }
      if (author && !keyword && start_date) {
        console.log('5')
        var query = {
          where: {
            author: req.params.author,
            createdAt: {
              [Op.lte]: req.params.end_date,
              [Op.gte]: req.params.start_date
            }
          }
        }
      }
      if (author && keyword && !start_date) {
        console.log('6')
        var query = {
          where: {
            author: req.params.author,
            include: [{
              model: Keyword,
              where: { word: req.params.keyword  }
            }]
          }
        }
      }
      if (author && keyword && start_date) {
        console.log('7')
        var query = {
          where: {
            author: req.params.author,
            createdAt: {
              [Op.lte]: req.params.end_date,
              [Op.gte]: req.params.start_date
            },
            include: [{
              model: Keyword,
              where: { word: req.params.keyword  }
            }]
          }
        }
      }

      // query for author
      var query = {
        include: [{
          model: User,
          as: 'Author',
          where: {
            username: req.params.author
          },
          attributes: []
        }]
      }
      */

      // query for given keyword
      var query = {
        include: [{
          model: Keyword,
          where: {
            word: req.params.keyword
          },
          attributes: []
        }]
      }
      await Question.findAll(query)
          .then(data => res.status(200).send(data))
          .catch(err => next(err))
    }
  }
