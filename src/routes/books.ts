const express = require('express');
const router = express.Router();
const booksController = require('../controller/books.ts');

router.post('/postimg', booksController.postimg); // 上传图片文件
router.post('/uploadNewBook', booksController.uploadNewBook); // 上传新书籍

module.exports = router;
export {};
