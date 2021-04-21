const models = require('../models');
const AuthToken = models.AuthToken;
const User = models.User;
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')

module.exports = {
    async create(req, res, next) {
        let username = req.user
        let accessToken = jwt.sign({username}, process.env.SECRET, {expiresIn: 60});
        let refreshToken = jwt.sign({username}, process.env.REFRESH_SECRET);
        return AuthToken.findAll({
            include: {
                model: User,
                where: {
                    username: username
                }
            },
            attributes: ['tokenstr']
        })
            .then(data => {
                if (data.length === 0) {
                    User.findAll({
                        where:{
                            username: username
                        }
                    })
                        .then(user => {
                        AuthToken.create({
                            tokenstr: refreshToken,
                            userId: user[0].id
                        })
                    })
                        .then(data => res.send({accessToken, refreshToken}))
                } else {
                    res.send({accessToken, refreshToken: data[0].tokenstr})
                }
            })

            .catch(err => next(err))
    },
    async remove(req, res, next){
        return AuthToken.destroy({
            where:{},
            include:{
                model: User,
                where: {
                    username: req.user
                }
            }
        })
            .then(data => {
                if(data  === 0 ) {
                    res.status(400).send({message: "You weren't logged in!"})
                }
                else{
                    res.status(200).send({message:"Logout successful!"})
                }
            })
            .catch(err => next(err))
    },
    async update(new_username, old_username){
        let refreshToken = jwt.sign({username: new_username}, process.env.REFRESH_SECRET);
        return AuthToken.update(
            {
              tokenstr: refreshToken
            },
            {
            where:{},
            include:{
                model: User,
                where: {
                    username: old_username
                }
            },
                returning:true,
                plain: true
        })
    },
    async validate(username,token){
        return AuthToken.findAll({
            where : {
                tokenstr: token
            },
            include: {
                model: User,
                where: {
                    username: username
                },
            },
            attributes: ['id']
        })
    },

};