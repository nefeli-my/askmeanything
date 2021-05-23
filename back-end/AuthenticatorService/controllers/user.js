const {Usercreate, Uservalidate, Userupdate} = require('../AuthService');

module.exports = {
    async create(req, res,next) {
        try {
            const createdUser = await Usercreate(req.body);
            if(createdUser.error) {
                let err = new Error(createdUser.error.response.data);
                err.status = createdUser.error.status;
                throw err;
            }
            return res.send(createdUser.body);
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
                let err = new Error(updatedUser.error.response.data);
                err.status = updatedUser.error.status;
                throw err;
            }
            return res.send(updatedUser.body.data);
        }
        catch (err) {
            next(err);
        }
    }
};
