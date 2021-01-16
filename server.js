const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const config = require("./config/dev")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function () {
    console.log('서버 실행 중 ...')
})


var connection = mysql.createConnection({
    host: (config.host),
    user: (config.user),
    database: (config.database),
    password: (config.password),
    port: 3306
})

con.connection(function(err) {
    if (err) throw err
    console.log("connected!")
    con.query(sql, function (err, result) {
        if (err) throw errconsole.log("Result: "+result)
    })
})

app.post('/user/join', function(req,res) {
    console.log(req.body)
    var userEmail = req.body.userEmail;
    var userPwd = req.body.userPwd;
    var userName = req.body.userName;
    
    var sql = 'INSERT INTO Users (UserEmail, UserPwd, UserName) VALUES (?, ?, ?)';
    var params = [userEmail, userPwd, userName];

    connection.query(sql, params, function(err, result) {
        var resultCode = 404;
        var message = '에러가 발생했습니다.';

        if (err) {
            console.log(err);
        } else {
            resultCode = 200;
            message = '회원가입에 성공했습니다.';
        }

        res.json({
            'code': resultCode,
            'message': message
        });
    })
})


app.post('/user/login', function (req,res) {
    console.log(req.body)
    var userEmail = req.body.userEmail
    var userPwd = req.body.userPwd

    var sql = 'select * from Users where UserEmail = ?'

    connection.query(sql, userEmail, function (err, result) {
        var resultCode = 404
        var message = '에러가 발생했습니다.'

        if (err) {
            console.log(err)
        } else {
            if (result.length === 0) {
                resultCode = 204
                message = '존재하지 않는 계정입니다.'
            } else if (userPwd !== result[0].userPwd) {
                resultCode = 204
                message = '비밀번호가 틀렸습니다.'
            } else {
                resultCode = 200
                message = '로그인을 성공했습니다.' + result[0].userName +'님 환영합니다.'
            }
        }
        res.json({
            'code': resultCode,
            'message': message
        })
    })
})