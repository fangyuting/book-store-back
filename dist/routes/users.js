"use strict";
var express = require('express');
var router = express.Router();
var usersController = require('../controller/users.ts');
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.get('/getCVCode', usersController.getCVCode); // 获取验证码
module.exports = router;
// export {};
//# sourceMappingURL=users.js.map