// 连接数据库操作
const mysql = require('mysql');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'book_store'
});

db.connect((err) => {
  if (err) {
    console.error('连接失败:' + err.stack);
    return;
  } else {
    console.log('连接成功');
  }
});
module.exports = db;
