// 导入 Express
const express = require('express');
const multer = require('multer');
const path = require('path');

// 创建 express 应用程序
const app = express();

// const cors = require('cors');
// app.use(cors());
//导入路由文件
const users = require('./src/routes/users.ts');
const college = require('./src/routes/college.ts');
const books = require('./src/routes/books.ts');
const shoppingCart = require('./src/routes/shoppingCart.ts');
const favorites = require('./src/routes/favorites.ts');
const bodyParser = require('body-parser');
const useMiddleware = require('./src/middleware');

app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//挂载路由
app.use('/users', users);
app.use('/college', college);
app.use('/books', books);
app.use('/shoppingCart', shoppingCart);
app.use('/favorites', favorites);

// 设置静态文件夹，这样 Express 就可以服务 public 目录下的文件
app.use(express.static(path.join(__dirname, '/src/public')));
/**中间件使用 */
useMiddleware(app);

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
