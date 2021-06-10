const models = require('../models');
const Question = models.Question;
const Keyword = models.Keyword;

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