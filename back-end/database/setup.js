const {connection} = require('./db_service');
const mysql = require('mysql');

let sql = 'CREATE TABLE IF NOT EXISTS user (username VARCHAR(50) PRIMARY KEY,  email VARCHAR(50) UNIQUE NOT NULL, fistName VARCHAR(50) NOT NULL, lastName VARCHAR(50) NOT NULL, password VARCHAR(2000) NOT NULL)';
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user created");
});

sql = 'CREATE TABLE IF NOT EXISTS keyword (keyword_id INT(10) AUTO_INCREMENT PRIMARY KEY, word VARCHAR(30) NOT NULL)';
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table keyword created");
});

sql = 'CREATE TABLE IF NOT EXISTS question (question_id INT(10) AUTO_INCREMENT PRIMARY KEY, author VARCHAR(50) NOT NULL, FOREIGN KEY(author) REFERENCES user(username), title VARCHAR(250) NOT NULL, body VARCHAR(1000) NOT NULL, created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)';
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table question created");
});

sql = 'CREATE TABLE IF NOT EXISTS answer (answer_id INT(10) AUTO_INCREMENT PRIMARY KEY, author VARCHAR(50) NOT NULL, FOREIGN KEY(author) REFERENCES user(username),' +
    'question_id INT(10) NOT NULL, FOREIGN KEY(question_id) REFERENCES question(question_id), body VARCHAR(1000) NOT NULL, created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)';
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table answer created");
});

sql = 'CREATE TABLE IF NOT EXISTS vote ( username VARCHAR(50) NOT NULL, FOREIGN KEY(username) REFERENCES user(username)' +
    ', answer_id INT(10) NOT NULL, FOREIGN KEY(answer_id) REFERENCES answer(answer_id), voting BOOLEAN NOT NULL, PRIMARY KEY (username,answer_id))';
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table vote created");
});

sql = 'CREATE TABLE IF NOT EXISTS question_keyword (question_id INT(10) NOT NULL,FOREIGN KEY(question_id) REFERENCES question(question_id), keyword_id INT(10) NOT NULL, FOREIGN KEY(keyword_id) REFERENCES keyword(keyword_id),' +
    'keyword_sequence INT(5) NOT NULL, PRIMARY KEY(question_id,keyword_id))';
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table question_keyword created");
});

sql = 'CREATE TABLE IF NOT EXISTS AuthToken (token VARCHAR(200) PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, FOREIGN KEY(username) REFERENCES user(username))';
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table AuthToken created");
});
