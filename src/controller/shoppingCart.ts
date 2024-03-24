import { Response, Request } from 'express';
const cvCode = require('../utils/cvCode').cvCode;
const md5 = require('./../utils').md5;
let verificationCode = ''; // 验证码
const nowTimeStamp = Date.now();
const { createToken, parseToken } = require('../utils/authorization');

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { ShoppingCartRequest } from '@/types/ShoppingCartTypeCart'; // 类型定义

type ShoppingCartInfoType = {
  id: string;
  owner: string;
  shopBook: string;
};

// 加入购物车
const addToShoppingCart = async (req: ShoppingCartRequest<ShoppingCartInfoType>, res: Response) => {
  const { owner, shopBook } = req.body;
  console.log(req.body);
  const existingBooks = await prisma.shoppingCart.findMany({
    where: {
      owner,
      shopBook
    }
  });
  if (existingBooks.length === 0) {
    const newShopBook = await prisma.shoppingCart.create({
      data: {
        owner,
        shopBook
      }
    });
    if (newShopBook) {
      res.json({
        status: 200,
        data: newShopBook,
        msg: 'addToShoppingCart success'
      });
    } else {
      res.json({
        status: 201,
        msg: 'addToShoppingCart failed'
      });
    }
  } else {
    res.json({
      status: 1005,
      msg: 'book alreay exist'
    });
  }
};

// 获取我的购物车
const getMyShoppingCart = async (req: ShoppingCartRequest<ShoppingCartInfoType>, res: Response) => {
  const { owner } = req.query;
  const existingBooks = await prisma.shoppingCart.findMany({
    where: {
      owner
    }
  });
  console.log('existingBooks', existingBooks);
  console.log(existingBooks.length);

  if (existingBooks.length !== 0) {
    const shoppingCartWithBooksInfo = [];
    for (let item of existingBooks) {
      const book = await prisma.books.findUnique({
        where: {
          id: item.shopBook
        }
      });
      if (book) {
        console.log('book', book);

        // 将书本信息附加到数组元素中
        const shoppingCartWithBookInfo = {
          ...item,
          bookInfo: book
        };
        shoppingCartWithBooksInfo.push(shoppingCartWithBookInfo);
      }
    }
    res.json({
      status: 200,
      data: shoppingCartWithBooksInfo,
      msg: 'getMyFavorites success'
    });
  } else {
    res.json({
      status: 201,
      msg: 'no books exist'
    });
  }
};

const deleteShoppingCartBook = async (
  req: ShoppingCartRequest<ShoppingCartInfoType>,
  res: Response
) => {
  const { id, owner, shopBook } = req.body;
  console.log('body', req.body);
  const newShoppingCart = await prisma.shoppingCart.delete({
    where: {
      id,
      owner,
      shopBook
    }
  });
  if (newShoppingCart) {
    res.json({
      status: 200,
      msg: 'deleteShoppingCartBook success'
    });
  } else {
    res.json({
      status: 201,
      msg: 'no Book Content'
    });
  }
};

module.exports = {
  addToShoppingCart,
  getMyShoppingCart,
  deleteShoppingCartBook
};
