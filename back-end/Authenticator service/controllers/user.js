const {Usercreate, Uservalidate, Userupdate, Userget} = require('../AuthService');

module.exports = {
    async create(req, res,next) {
        try {
            const createdUser = await Usercreate(req.body);
            if(createdUser.error) {
                let err = new Error(createdUser.error.response.data.msg);
                err.status = createdUser.error.status;
                throw err;
            }
            return res.status(createdUser.status).send(createdUser.body);
        }
        catch (err) {
            next(err);
        }
    },
    async get(req,res,next) {
        try {
            console.log(req.query.username)
            const returnedUser = await Userget(req.query.username);
            if(returnedUser.error) {
                let err = new Error(returnedUser.error.response.data.msg);
                err.status = returnedUser.error.status;
                throw err;
            }
            return res.status(returnedUser.status).send(returnedUser.body);
        }
        catch (err) {
            next(err);
        }
    },
    async validate(user){
        try {
            const validatedUser = await Uservalidate(user);
            if(validatedUser.error) {
                let err = new Error(validatedUser.error.response.data.msg);
                err.status = validatedUser.error.status;
                throw err;
            }
            return validatedUser.body;
        }
        catch (err) {
            console.log(err)
        }
    },
    async update(req, res,next) {
        try {
            req.body.user = req.user;
            const updatedUser = await Userupdate(req.body);
            if(updatedUser.error) {

                let err = new Error(updatedUser.error.response.data.msg);
                err.status = updatedUser.error.response.status;
                throw err;
            }
            return res.status(updatedUser.status).send(updatedUser.body.data);
        }
        catch (err) {
            next(err);
        }
    }
};
