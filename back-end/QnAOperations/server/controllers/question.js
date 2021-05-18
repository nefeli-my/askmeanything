const models = require('../models');
const User = models.User;
const Question = models.Question;

module.exports = {
    async create(req, res, next) {
        let question;
        question.title = req.body.title;
        question.body = req.body.body;
        question.keywords = req.body.keywords;
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
                    include: models.Keyword,
                    returning: true,
                    plain: true
                }
            )
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
    },
    async findAll(req, res, next){
        await Question.findAll({limit: 10, order: [['createdAt', 'DESC']], raw: true})
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
    },
    async findFiltered(req, res, next){
      let author = req.params.author !== null;
      let keyword = req.params.keyword !== null;
      let start_date = req.params.start_date !== null;
      let end_date = req.params.end_date !== null;

      if (author && !keyword && !start_date) {
        await Question.findAll({
                where: {
                  author: req.params.author
                }
             })
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
      }
      if (author && keyword && !start_date) {
        await Question.findAll({
                where: {
                  author: req.params.author,
                  // keyword
                }
             })
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
      }
      if (author && keyword && start_date) {
        await Question.findAll({
                where: {
                  author: req.params.author,
                  // keyword ,
                  createdAt: {
                    // params may need some modification
                    // to fit the Date() type
                    [Op.lte]: req.params.end_date,
                    [Op.gte]: req.params.start_date
                  }
                }
             })
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
      }
      if (keyword && !start_date && !author) {
        await Question.findAll({
                where: {
                  // keyword
                }
             })
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
      }
      if (keyword && start_date && !author) {
        await Question.findAll({
                where: {
                  // keyword ,
                  createdAt: {
                    [Op.lte]: req.params.end_date
                    [Op.gte]: req.params.start_date
                  }
                }
             })
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
      }
      if (start_date && !author && !keyword) {
        await Question.findAll({
                where: {
                  createdAt: {
                    [Op.lte]: req.params.end_date,
                    [Op.gte]: req.params.start_date
                  }
                }
             })
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
      }
      if (start_date && author && !keyword) {
        await Question.findAll({
                where: {
                  author: req.params.author,
                  createdAt: {
                    [Op.lte]: req.params.end_date,
                    [Op.gte]: req.params.start_date
                  }
                }
             })
            .then(data => res.status(200).send(data))
            .catch(err => next(err))
      }
}
