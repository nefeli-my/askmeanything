const {connection} = require('../../database/db_service')
const bcrypt = require('bcryptjs');
const mysql = require('mysql')

function getHashedPassword (password) {
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hash;
}

const checkUser = async (user) => {
    try{
        const response = await new Promise((resolve, reject) =>
        {
            let sql = `SELECT * FROM user WHERE '${user.username}'=username or '${user.email}'=email`
            connection.query(sql, function (err, result) {
                if (err) reject(new Error(err.message));
                else if (result.length === 0) {
                    resolve(false);
                } else {
                    resolve(true)
                }
            })
        })
        return response;
    } catch(error){
        console.log(error)
    }
}

const insertUser = async (user) => {
    try {
        const response = await new Promise((resolve, reject) => {
            const hashedPassword = getHashedPassword(user.password);
            let sql = `INSERT INTO user VALUES ('${user.username}', '${user.email}','${user.firstName}', '${user.lastName}', '${hashedPassword}')`

            // Store user into the database if you are using one
            connection.query(sql, function (err, result) {
                if (err) reject(new Error(err.message));
                else {
                    resolve({
                        message: "Alles ok!"
                    })
                }
            })
        })
        return response;
    }catch(error){
        console.log(error)
    }

}

const checkUserS = async(user) => {
    try {
        const response = await new Promise((resolve, reject) => {
            let sql = `SELECT * FROM user WHERE '${user.username}'=username`
            connection.query(sql, function (err, result) {
                if (err) reject(new Error(err.message));
                else if (result.length !== 0 && bcrypt.compareSync(user.password, result[0].password)) {
                    resolve(user.username)
                } else {
                    resolve(false)
                }
            })
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}

const getUserbyCookie = async(cookie) => {
    try{
        const response = await new Promise((resolve, reject) => {
            let sql = `SELECT username FROM authtoken WHERE '${cookie}'=token`
            connection.query(sql, function (err, result) {
                if (err) reject(new Error(err.message));
                else if (result.length !== 0) {
                    resolve(result[0]['username'])
                } else {
                    resolve(null)
                }
            })
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}

const getAuthtoken = async(username,token) => {
    if(token) {
        try {
            const response = await new Promise((resolve, reject) => {
                let sql = `SELECT * FROM authtoken WHERE '${username}'=username AND token='${token}'`
                connection.query(sql, function (err, result) {
                    if (err) reject(new Error(err.message));
                    else if (result.length !== 0) {
                        resolve(result.length == 1)
                    } else {
                        resolve(false)
                    }
                })
            })
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    else{
        try {
            const response = await new Promise((resolve, reject) => {
                let sql = `SELECT token FROM authtoken WHERE '${username}'=username`
                connection.query(sql, function (err, result) {
                    if (err) reject(new Error(err.message));
                    else if (result.length !== 0) {
                        resolve(result[0].token)
                    } else {
                        resolve(false)
                    }
                })
            })
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}

const createAuthtoken = async(authToken,username) => {
    try {
        let answer = await getAuthtoken(username)
            .then(async first => {
                if (first) return first
                else {
                    const response = await new Promise((resolve, reject) => {
                        let sql = `INSERT INTO authtoken VALUES ('${authToken}', '${username}')`
                        connection.query(sql, function (err, result) {
                            if (err) reject(new Error(err.message));
                            resolve(authToken)
                        })
                    })
                    return response;
                }
            })
        return answer
    } catch (error) {
        console.log(error)
    }

}
const deleteAuthtoken = async(username) => {
    try{
        const response = await new Promise((resolve, reject) => {
            let sql = `DELETE FROM authtoken WHERE username='${username}'`
            connection.query(sql, function (err, result) {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows==1)
            })
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}




module.exports =  {deleteAuthtoken,createAuthtoken,getAuthtoken,checkUser,checkUserS,insertUser };