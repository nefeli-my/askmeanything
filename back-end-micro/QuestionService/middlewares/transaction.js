const Sequelize = require('sequelize')
const cls = require('cls-hooked')


module.exports = function({ sequelize }) {
    if (!sequelize || !(sequelize instanceof Sequelize)) {
        throw new Error('must be passed an instance of Sequelize');
    }

    if (Sequelize.cls) {
        namespace = Sequelize.cls;
    } else {
        namespace = cls.createNamespace('express-sequelize-transaction');
        Sequelize.cls = namespace;
    }
    sequelize.constructor.useCLS(namespace);
    return function(req, res, next) {
        sequelize.transaction({autocommit:false})
            .then( async function(t) {
            next();
            await new Promise((resolve) => res.on('finish', resolve));
            if(res.statusCode === 500 || res.statusCode === 400)
                t.rollback();
            else
                t.commit();
        })
            .catch(next)
    }
}