import { Response, Request } from 'express';
const cvCode = require('../utils/cvCode').cvCode;
const md5 = require('./../utils').md5;
let verificationCode = ''; // 验证码
const nowTimeStamp = Date.now();
const { createToken, parseToken } = require('../utils/authorization');

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { FavoritesRequest } from '@/types/FavoritesTypeDef'; // 类型定义

type FavoritesInfoType = {
  id: string;
  favoritesOwner: string;
  favoritesBook: string;
  bookTitle: String;
};

// 加入收藏夹
const addToFavorites = async (req: FavoritesRequest<FavoritesInfoType>, res: Response) => {
  const { favoritesOwner, favoritesBook } = req.body;
  console.log(req.body);
  const existingBooks = await prisma.favorites.findMany({
    where: {
      favoritesOwner,
      favoritesBook
    }
  });
  if (existingBooks.length === 0) {
    const newFavoritesBook = await prisma.favorites.create({
      data: {
        favoritesOwner,
        favoritesBook: favoritesBook // 正确设置 favoritesBook
      }
    });
    if (newFavoritesBook) {
      res.json({
        status: 200,
        data: newFavoritesBook,
        msg: 'addToFavorites success'
      });
    } else {
      res.json({
        status: 201,
        msg: 'addToFavorites failed'
      });
    }
  } else {
    res.json({
      status: 1005,
      msg: 'book alreay exist'
    });
  }
};

const getMyFavorites = async (req: FavoritesRequest<FavoritesInfoType>, res: Response) => {
  const { favoritesOwner } = req.query;
  const existingBooks = await prisma.favorites.findMany({
    where: {
      favoritesOwner
    }
  });
  if (existingBooks.length !== 0) {
    const favoritesWithBooksInfo = [];
    for (let item of existingBooks) {
      const book = await prisma.books.findUnique({
        where: {
          id: item.favoritesBook
        }
      });
      if (book) {
        // 将书本信息附加到数组元素中
        const favoriteWithBookInfo = {
          ...item,
          bookInfo: book
        };
        favoritesWithBooksInfo.push(favoriteWithBookInfo);
      }
    }
    res.json({
      status: 200,
      data: favoritesWithBooksInfo,
      msg: 'getMyFavorites success'
    });
    // res.json({
    //   status: 200,
    //   data: existingBooks,
    //   msg: 'getMyFavorites success'
    // });
  } else {
    res.json({
      status: 201,
      msg: 'no books exist'
    });
  }
};

module.exports = {
  addToFavorites,
  getMyFavorites
};
