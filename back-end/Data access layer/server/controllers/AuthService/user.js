const models = require('../../models');
const User = models.User;
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

//store the hashed password
function getHashedPassword (password) {
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hash;
}

//db operations for the Authenticator service
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
                        .then(user => res.status(201).send({username:user.username,createdOn:user.updatedAt.toString()}))
                        .catch(error => next(error))
                }
                else{
                    return res.status(400).send({msg:'User already exists'})
                }
            })
            .catch(err => next(err))
    },
    async get(req,res,next) {
        try {
            const user = await User.findAll({
              where:
                  {
                      username: req.params.id
                  }
            });
            return res.status(200).send(user);
        } catch (err) {
            next(err)
        }
    },
    validate(req,res,next){
        const {username, password} = req.body;
        return User.findAll({
            where:
                {
                    username: username,
                },
            attributes: ['password']
        })
            .then(data => {
                if(data.length != 0 && bcrypt.compareSync(password, data[0].password)){
                    res.send(username)
                }
                else{
                    res.send(false)
                }
            })
            .catch(err=>next(err))
    },
    async update(req, res,next) {
        try {
            if (req.body.username || req.body.email) {
                res.status(400).send({msg: 'Username and email can not be changed!'})
            } else {
                if (req.body.password)
                    req.body.password = getHashedPassword(req.body.password)
                const data = await User.update(
                    req.body,
                    {
                        where: {
                            username: req.body.user
                        },
                        returning: true,
                        plain: true
                    }
                );
                if(data[0] === 0 ) res.status(200).send({msg: 'Nothing was updated'})
                else {
                    let {username, firstName, lastName, email, updatedAt} = data[1];
                    let user = {username, firstName, lastName, email, updatedAt: updatedAt.toString()};
                    res.status(200).send(user)
                }
            }
        }
        catch(err){
            next(err)
        }
      }
};
