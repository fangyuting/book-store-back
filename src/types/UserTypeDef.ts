import { Request } from 'express';
export type UserInfoRequest<ResBody = any, ResQuery = any> = Request<
  undefined,
  any,
  ResBody,
  ResQuery
> & { headers: { token?: string } };
