const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controller/shoppingCart.ts');

router.post('/addToShoppingCart', shoppingCartController.addToShoppingCart); // 加入购物车
router.get('/getMyShoppingCart', shoppingCartController.getMyShoppingCart); // 获取购物车
module.exports = router;
export {};
