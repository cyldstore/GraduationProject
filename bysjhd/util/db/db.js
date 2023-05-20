// 连接数据库
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'admin123',
    database: 'my_bysj_db'
})

module.exports = db