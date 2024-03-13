import { Request } from 'express';

export type BookRequest<ResBody = any, ResQuery = any> = Request<
  undefined,
  any,
  ResBody,
  ResQuery
> & { headers: { token?: string } };
