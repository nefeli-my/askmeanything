const models = require('../models');
const Question = models.Question;
const Keyword = models.Keyword;

// question creation controller, Sequelize ORM used
// used for updating the Answer's microservice's database
// after new question creation via the Question Microservice
module.exports = {
    async create(question) {
        try {
            const keywords = question.keywords;
            delete question.keywords;
            const questionC = await Question.create(question);
            for (let x of keywords) {
                const keyw = await Keyword.findOrCreate(
                    {
                        where: {
                            word: x.word
                        }
                    })
                await questionC.addKeyword(keyw[0])
            }
        }
        catch (err){
            throw err;
        }
    }
};