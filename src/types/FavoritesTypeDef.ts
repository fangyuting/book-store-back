import { Request } from 'express';

export type FavoritesRequest<ResBody = any, ResQuery = any> = Request<
  undefined,
  any,
  ResBody,
  ResQuery
> & { headers: { token?: string } };
