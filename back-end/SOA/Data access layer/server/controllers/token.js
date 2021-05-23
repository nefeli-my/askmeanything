const models = require('../models');
const AuthToken = models.AuthToken;
const User = models.User;
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    async create(req, res, next) {
        let username = req.body.user;
        let accessToken = jwt.sign({username}, process.env.SECRET, {expiresIn: 30000});
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
                        .then(async user => {
                            await AuthToken.create({
                                tokenstr: refreshToken,
                                userId: user[0].id
                            })
                        })
                        .then(data => res.send({accessToken, refreshToken}))
                        .catch(err => next(err))
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
    async validate(req, res, next){
        try {
            const {username, token} = req.body;
            const isThere = await AuthToken.findAll({
                where: {
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
            res.send(isThere)
        }catch(err){
            next(err);
        }
    },

};