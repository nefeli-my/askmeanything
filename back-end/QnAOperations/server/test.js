const db = require('./models')
const models = require('./models');
const User = models.User;
const Question = models.Question;
const Answer = models.Answer;
const AuthToken = models.AuthToken;
const Keyword = models.Keyword;
const dotenv = require('dotenv')
dotenv.config()

async function test() {
    let user = await User.findByPk(101)
    let res = await user.getAnswers({raw: true});
    console.log(res)
    //let question = await Question.findByPk(39)
    //let res1 = await question.getUser({raw:true})
    //console.log(res1)
    /*let token = await AuthToken.findByPk(3);
    let res2 = await token.getUser({raw:true});
    //console.log(res2)
    let res3 = await question.getAnswers({raw:true})
    //console.log(res3)
    let res4 = await question.getKeywords({raw:true})
    //console.log(res4)
    let keyword = await Keyword.findByPk(35)
    let res5 = await keyword.getQuestions({raw:true})
    //console.log(res5)
    let answer = await Answer.findByPk(37)
    let res6 = await  answer.getUser({raw:true})
    //console.log(res6)
    let res7 = await answer.getQuestion({raw:true})
    //console.log(res7)
    let res8 = await user.getAuthToken({raw: true})
    //console.log(res8)
     */
}
test()
/*

Question.bulkCreate([
    {title: 'john-doe@domain.com', body: 'John',author: 1},
    {title: 'log_w@domain.com', body: 'Logan',author: 1},
    {title: 'john-connor@domain.com', body: 'John',author: 1}
])
    .then((newUsers) => {
        console.log(newUsers)
    })
    .catch((err) => {
        console.log("Error while users creation : ", err)
    })


Question.findAll()
    .then(data => console.log(data))
*/
/*crypto.randomBytes(128).toString('hex')
//TRUNCATE TABLE public."Keywords" RESTART IDENTITY CASCADE
*/




