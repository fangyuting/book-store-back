import { Request } from 'express';

export type ShoppingCartRequest<ResBody = any, ResQuery = any> = Request<
  undefined,
  any,
  ResBody,
  ResQuery
> & { headers: { token?: string } };
