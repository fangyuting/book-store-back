const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controller/shoppingCart.ts');

router.post('/addToShoppingCart', shoppingCartController.addToShoppingCart); // 加入购物车
router.get('/getMyShoppingCart', shoppingCartController.getMyShoppingCart); // 获取购物车
router.post('/deleteShoppingCartBook', shoppingCartController.deleteShoppingCartBook); // 删除购物车书籍
module.exports = router;
export {};
