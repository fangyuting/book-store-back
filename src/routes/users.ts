const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.ts');

router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.get('/getCVCode', usersController.getCVCode); // 获取验证码
router.get('/getUserInfo', usersController.getUserInfo); // 获取用户信息
router.post('/updateUserInfo', usersController.updateUserInfo); // 更新用户信息

// router.post('/postimg', usersController.postimg);
module.exports = router;
export {};
