const models = require('../models');
const User = models.User;
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')
const updateToken = require('../controllers/authtoken').update


function getHashedPassword (password) {
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hash;
}
module.exports = {
    async create(req, res,next) {
        const { username, email, firstName, lastName, password} = req.body;
        return User
            .findAll({
                where :{
                    [Op.or]:[{
                            username: username
                        },
                        {
                            email: email
                        }
                        ]
                    }
                })
            .then (data => {
                if(data.length === 0) {
                    return User.create({
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        password: getHashedPassword(password),
                        email: email
                    })
                        .then(user => res.status(201).send({username:user.username,createdOn:user.updatedAt}))
                        .catch(error => next(error))
                }
                else{
                    return res.status(400).send('User already exists')
                }
            })
            .catch(err => next(err))
    },
    validate(user){
      return User.findAll({
          where:
              {
                  username: user.username,
              },
          attributes: ['password']
      })
          .then(data => {
              if(data.length != 0 && bcrypt.compareSync(user.password, data[0].password)){
                  return user.username
              }
              else{
                  return false
              }
          })
          .catch(err=>console.log(err))
    },
    async update(req, res,next) {
        try{
            const data = await User.update(
                    req.body,
                    {
                        where: {
                            username : req.user
                        },
                        returning:true,
                        plain: true
                    }
                );
            let {username, firstName, lastName, email, updatedAt} = data[1];
            let accessToken = jwt.sign({username}, process.env.SECRET, {expiresIn: 60});
            let user = {username, firstName, lastName, email, updatedAt, accessToken};
            let dataToken = await updateToken(username, req.user);
            user.refreshToken  = dataToken[1].tokenstr;
            res.status(200).send(user)
        }
        catch(err){
            next(err)
        }
    }
};