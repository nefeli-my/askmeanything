const models = require('../../models');
const User = models.User;
const bcrypt = require('bcryptjs');
const axios = require("axios");
const { Op } = require("sequelize");
const busURL = process.env.BUS_URL + '/bus';

function getHashedPassword (password) {
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hash;
}

// controllers for creating user, getting and updating account information,
// validating user's credentials
// Sequelize ORM used
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
                        .then(user => {
                            res.status(201).send({username:user.username,createdOn:user.updatedAt.toString()});
                            return user;
                        })
                        .catch(error => next(error))
                        .then(user =>
                            axios.post(busURL,{
                                event : {
                                    action: 'createUser'
                                    ,
                                    user: {
                                        id: user.id,
                                        username: user.username
                                    }
                                },
                                channel: 'channel_users'
                            })
                        )
                        .catch(error => console.log(error))
                }
                else{
                    return res.status(400).send({msg:'User already exists'})
                }
            })
            .catch(err => next(err))
    },
    async get(req, res,next) {
        const username = req.user;
        try {
            const user = await User.findAll({
                where:
                    {
                        username: username,
                    }
            });
            return res.status(200).send(user);
        } catch (err) {
            next(err)
        }
    },
    async validate(user) {
        const {username, password} = user;
        return User.findAll({
            where:
                {
                    username: username,
                },
            attributes: ['password']
        })
            .then(data => {
                if(data.length != 0 && bcrypt.compareSync(password, data[0].password)){
                    return username;
                }
                else{
                    return false;
                }
            })
    },
    async update(req, res,next) {
        try {
            if (req.body.username || req.body.email) {
                res.status(400).send({msg: 'Username and email can not be changed!'})
            } else {
                if (req.password)
                    req.password = getHashedPassword(req.password)
                const data = await User.update(
                    req.body,
                    {
                        where: {
                            username: req.user
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
