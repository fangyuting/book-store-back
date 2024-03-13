import { log } from 'console';
const multer = require('multer');
const path = require('path');
// 导入 Express
const express = require('express');

// 创建 express 应用程序
const app = express();

// const cors = require('cors');
// app.use(cors());
//导入路由文件
const users = require('./src/routes/users.ts');
const college = require('./src/routes/college.ts');
const books = require('./src/routes/books.ts');

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// 设置 JSON 解析器的限制
app.use(express.json({ limit: '50mb' }));
// 设置 URL 编码解析器的限制
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//挂载路由
app.use('/users', users);
app.use('/college', college);
app.use('/books', books);

// 设置静态文件夹，这样 Express 就可以服务 public 目录下的文件
app.use(express.static(path.join(__dirname, '/src/public')));

// 设置存储策略
const storage = multer.diskStorage({
  destination: function (cb: any) {
    cb(null, 'uploads/');
  },
  filename: function (file: any, cb: any) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
// 创建 multer 实例
const upload = multer({ storage: storage });

// 指定本地服务ip地址，开启本地服务端口
app.listen(8000, async () => {
  console.log('Server is running, http://127.0.0.1:8000/');
});
