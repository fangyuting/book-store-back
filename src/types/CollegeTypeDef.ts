import { Request } from 'express';

export type CollegeInfoRequest<ResBody = any, ResQuery = any> = Request<
  undefined,
  any,
  ResBody,
  ResQuery
> & { headers: { token?: string } };
