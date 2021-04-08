const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


connection.connect(function(err) {
        if (err) {
            console.error('error: ' + err.message);
        }
        console.log('db ' + connection.state);
    }
)



module.exports = {connection};