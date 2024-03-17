import { Response, Request } from 'express';
const cvCode = require('../utils/cvCode').cvCode;
const md5 = require('./../utils').md5;
let verificationCode = ''; // 验证码
const nowTimeStamp = Date.now();
const { createToken, parseToken } = require('../utils/authorization');

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { UserInfoRequest } from '@/types/UserTypeDef'; // 类型定义

type userInfoType = {
  id: string;
  account: string;
  password: string;
  repassword: string;
  cvCode: string;
  cvCodeTimestamp: number;
  avatar: string;
  nickName: string;
  sex: number;
  age: number;
  files: string;
};

// 登录
const login = async (req: UserInfoRequest<userInfoType>, res: Response) => {
  const { account, password, cvCode, cvCodeTimestamp } = req.body;
  console.log(req.body);

  // 是否存在该用户
  const existingUser = await prisma.users.findUnique({
    where: {
      account: account
    }
  });
  const pass = md5(password);
  console.log(existingUser);

  if (!existingUser || existingUser.password !== pass) {
    console.log('账号/密码错误');
    return res.json({
      status: 1001,
      data: null,
      msg: '登录失败,账号或密码错误'
    });
  } else if (existingUser && existingUser.status == 1) {
    console.log('账户已被冻结');
    return res.json({
      status: 1002,
      data: null,
      msg: '用户账号已被冻结'
    });
  } else if (existingUser && existingUser.status == 2) {
    console.log('账户已被注销');
    return res.json({
      status: 1003,
      data: null,
      msg: '用户账户已被注销'
    });
  }

  if (nowTimeStamp - cvCodeTimestamp > 6000) {
    console.log('验证码过期');
    return res.json({
      status: 1004,
      data: null,
      msg: '验证码过期'
    });
  } else {
    if (cvCode.toLocaleUpperCase() !== verificationCode) {
      console.log('验证码错误');
      return res.json({
        status: 1004,
        data: null,
        msg: '验证码错误'
      });
    }
  }

  const token = createToken(existingUser.id);
  await prisma.users.update({
    where: {
      id: existingUser.id
    },
    data: {
      lastLoginTime: new Date(new Date().getTime() + 8 * 3600000)
    }
  });

  return res.json({
    status: 200,
    data: existingUser,
    token: token,
    msg: 'login success'
  });
};

// 注册
const register = async (req: UserInfoRequest<userInfoType>, res: Response) => {
  console.log(req.body);
  const { account, password, repassword, cvCode, cvCodeTimestamp } = req.body;

  const existingUser = await prisma.users.findUnique({
    where: {
      account: account
    }
  });

  if (existingUser) {
    console.log('账户已被注册');
    return res.json({
      status: 1005,
      data: null,
      msg: '账户已被注册'
    });
  }

  if (nowTimeStamp - cvCodeTimestamp > 6000) {
    console.log('验证码过期');
    return res.json({
      status: 1004,
      data: null,
      msg: '验证码过期'
    });
  } else {
    if (cvCode.toLocaleUpperCase() !== verificationCode) {
      console.log('验证码错误');
      return res.json({
        status: 1004,
        data: null,
        msg: '验证码错误'
      });
    }
  }

  const newUser = await prisma.users.create({
    data: {
      account: account,
      password: md5(password)
    }
  });

  return res.json({
    status: 200,
    data: newUser,
    msg: 'register success'
  });
};

// 获取验证码
const getCVCode = (req: Request, res: Response) => {
  const { code, timestamp } = cvCode();
  verificationCode = code;
  return res.json({
    status: 200,
    data: verificationCode,
    timestamp,
    msg: 'code success'
  });
};

// 获取用户信息
const getUserInfo = async (req: UserInfoRequest<userInfoType>, res: Response) => {
  console.log('query', req.query);
  const { id } = req.query;

  const existingUser = await prisma.users.findUnique({
    where: {
      id: id
    }
  });
  console.log('existingUser', existingUser);
  if (!existingUser) {
    return res.json({
      status: 200,
      data: existingUser,
      msg: 'getUserInfo success'
    });
  } else {
    return res.json({
      status: '1006',
      msg: 'getUserInfo failed'
    });
  }
};

const updateUserInfo = async (req: UserInfoRequest<userInfoType>, res: Response) => {
  const { account, avatar, id, nickName, sex, age } = req.body;
  console.log(req.body);
  console.log('headers', req.headers);
  console.log(req.headers.authorization);

  // 查找账户名account是否已存在
  const existingUser = await prisma.users.findUnique({
    where: {
      account: account
    }
  });
  if (existingUser && existingUser.id !== id) {
    return res.json({
      status: 1005,
      msg: 'accountName exist'
    });
  } else {
    const updatedUser = await prisma.users.update({
      where: {
        id
      },
      data: {
        account,
        avatar,
        nickName,
        sex,
        age: +age
      }
    });
    // console.log('updatedUser', updatedUser);
    if (updatedUser) {
      res.json({
        status: 200,
        data: updatedUser,
        msg: 'updateUserInfo success'
      });
    }
  }
};

module.exports = {
  login,
  register,
  getCVCode,
  getUserInfo,
  updateUserInfo
  // postimg
};
