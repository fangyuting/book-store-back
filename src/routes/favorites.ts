const express = require('express');
const router = express.Router();
const favoritesController = require('../controller/favorites.ts');

router.post('/addToFavorites', favoritesController.addToFavorites); // 加入收藏夹
router.get('/getMyFavorites', favoritesController.getMyFavorites); // 获取我的收藏夹
module.exports = router;
export {};
