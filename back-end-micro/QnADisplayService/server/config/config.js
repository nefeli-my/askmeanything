require('dotenv').config();
module.exports = {

  // If using online database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: 'QnADisplayService',
    username: 'saas25',
    password: process.env.DB_PASS,
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  test: {
    database: 'AskMeAnything',
    username: 'saas25',
    password: process.env.DB_PASS,
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  }
};