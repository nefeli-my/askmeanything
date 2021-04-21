const models = require('../models');
const User = models.User;
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

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
                        .then(user => res.status(200).send({username:user.username,createdOn:user.updatedAt}))
                        .catch(error => next(error))
                }
                else{
                    return res.status(200).send('User already exists')
                }
            })
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
    }


};