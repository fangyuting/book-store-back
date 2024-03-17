import { Response, Request } from 'express';
const cvCode = require('../utils/cvCode').cvCode;
const md5 = require('./../utils').md5;
const nowTimeStamp = Date.now();
const { createToken, parseToken } = require('../utils/authorization');

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { BookRequest } from '@/types/BookTypeDef';
// import { UserInfoRequest } from '@/types/UserTypeDef'; // 类型定义

type BookInfoType = {
  id: string;
  ownerId: string;
  bookAuthor: string;
  bookTitle: string;
  bookOriginPrice: number;
  bookCurrentPrice: number;
  bookType: Array<any>;
  // typeLevel1: string;
  // typeLevel2: string;
  bookImgSrc: string;
  bookDesc: string;
  files: string;
  bookImgPath: string;
};
const fs = require('fs');
const path = require('path');

const postimg = (req: BookRequest<BookInfoType>, res: Response) => {
  const { files } = req.body; // 假设前端发送的是base64编码的文件

  if (!files) {
    return res.json({ status: 400, msg: 'No file provided' });
  }

  const imgtype = files.match(/data:image\/(png|jpe?g|gif|webp);/)?.[1]; // 获取文件类型
  if (!imgtype) {
    return res.json({ status: 400, msg: 'Invalid file format' });
  }

  const filename = `${Math.floor(Math.random() * 10000000000)}.${imgtype}`; // 生成随机文件名
  const filepath = path.join(__dirname, '/../public/updateImg/', filename); // 指定文件保存路径
  console.log('filepath', filepath);

  // 将base64字符串转换为Buffer
  const base64Data = files.replace(/^data:image\/\w+;base64,/, '');
  const fileBuffer = Buffer.from(base64Data, 'base64');

  // 将Buffer写入文件
  fs.writeFile(filepath, fileBuffer, (err: any) => {
    if (err) {
      console.error('Error writing file', err);
      return res.json({ status: 500, msg: 'Error saving file' });
    }

    // 文件保存成功，返回成功响应
    res.json({
      status: 200,
      msg: 'postimg success',
      filePath: `http://localhost:8000/updateImg/${filename}`
    });
  });
};

// 上传新书籍
const uploadNewBook = async (req: BookRequest<BookInfoType>, res: Response) => {
  console.log(req.body);
  const {
    bookTitle,
    bookAuthor,
    bookType,
    bookOriginPrice,
    bookCurrentPrice,
    bookDesc,
    ownerId,
    bookImgPath
  } = req.body;

  const newBook = await prisma.books.create({
    data: {
      bookTitle,
      bookAuthor,
      typeLevel1: bookType[0],
      typeLevel2: bookType[1],
      originPrice: +bookOriginPrice,
      currentPrice: +bookCurrentPrice,
      desc: bookDesc,
      ownerId,
      status: 0,
      bookImgPath
    }
  });
  console.log(newBook);

  res.json({
    status: 200,
    msg: 'uploadNewBook success'
  });
};

// 获取指定类型书籍
const getSpecifyTypeBooks = async (req: BookRequest<BookInfoType>, res: Response) => {
  const { typeLevel1, typeLevel2 } = req.query;

  const existingBooks = await prisma.books.findMany({
    where: {
      typeLevel1,
      typeLevel2
    }
  });
  console.log('existingBooks', existingBooks);
  if (existingBooks.length !== 0) {
    res.json({
      status: 200,
      data: existingBooks,
      msg: 'getSpecifyTypeBooks success'
    });
  } else {
    res.json({
      status: 204,
      msg: '204 No Content'
    });
  }
};

// 获取单本书籍信息
const getSingleBookInfo = async (req: BookRequest<BookInfoType>, res: Response) => {
  const { id } = req.query;
  const existingBooks = await prisma.books.findUnique({
    where: {
      id
    }
  });
  if (existingBooks) {
    res.json({
      status: 200,
      data: existingBooks,
      msg: 'getSingleBookInfo success'
    });
  } else {
    res.json({
      status: 201,
      msg: 'bookInfo not exist'
    });
  }
};

module.exports = {
  postimg,
  uploadNewBook,
  getSpecifyTypeBooks,
  getSingleBookInfo
};
