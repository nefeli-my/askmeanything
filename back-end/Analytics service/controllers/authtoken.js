const {Tokencreate, Tokendelete, Tokenvalidate} = require('../AuthService');

module.exports = {
    async create(req, res, next) {
        try {
            const createdToken = await Tokencreate(req.user);
            if(createdToken.error) {
                let err = new Error(createdToken.error.response.data.msg);
                err.status = createdToken.error.status;
                throw err;
            }
            return res.send(createdToken.body);
        }
        catch (err) {
            next(err);
        }
    },
    async remove(req, res, next) {
        try {
            const deletedToken = await Tokendelete(req.user);
            if(deletedToken.error) {
                let err = new Error(deletedToken.error.response.data.message);
                err.status = deletedToken.error.status;
                throw err;
            }
            return res.end(deletedToken.body);
        }
        catch (err) {
            next(err);
        }
    },
    async validate(username,token){
        try {
            const validatedToken = await Tokenvalidate({username,token});
            if(validatedToken.error) {
                let err = new Error(validatedToken.error.response.data.msg);
                err.status = validatedToken.error.status;
                throw err;
            }
            return validatedToken.body;
        }
        catch (err) {
            console.log(err)
        }
    },

};
