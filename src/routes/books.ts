const express = require('express');
const router = express.Router();
const booksController = require('../controller/books.ts');

router.post('/postimg', booksController.postimg); // 上传图片文件
router.post('/uploadNewBook', booksController.uploadNewBook); // 上传新书籍
router.get('/getSpecifyTypeBooks', booksController.getSpecifyTypeBooks); // 获取指定类型书籍
router.get('/getSingleBookInfo', booksController.getSingleBookInfo); // 获取单本书籍信息
module.exports = router;
export {};
