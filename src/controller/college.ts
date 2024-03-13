import { Response, Request } from 'express';
const cvCode = require('../utils/cvCode').cvCode;
const md5 = require('./../utils').md5;
const nowTimeStamp = Date.now();
const { createToken, parseToken } = require('../utils/authorization');

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { CollegeInfoRequest } from '@/types/CollegeTypeDef';

type CollegeInfo = {
  id: string;
  college: string;
};
// 校园认证
const collegeAuthenticate = async (req: CollegeInfoRequest<CollegeInfo>, res: Response) => {};

module.exports = {
  collegeAuthenticate
};
