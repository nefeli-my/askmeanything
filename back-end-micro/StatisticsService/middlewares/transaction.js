const Sequelize = require('sequelize')
const cls = require('cls-hooked')


module.exports = function({ sequelize }) {
    if (!sequelize || !(sequelize instanceof Sequelize)) {
        throw new Error('must be passed an instance of Sequelize');
    }
    let namespace;
    namespace = cls.createNamespace('express-sequelize-transaction');
    sequelize.constructor.useCLS(namespace);
    return function(req, res, next) {
        namespace.run(() => {
            sequelize.transaction({autocommit: false})
                .then(async function (t) {
                    namespace.set('transaction', t);
                    next();
                    await new Promise((resolve) => res.on('finish', resolve));
                    if (res.statusCode === 500 || res.statusCode === 400)
                        t.rollback();
                    else
                        t.commit();
                })
                .catch(next)
        });
    }
}