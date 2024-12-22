import type { RequestHandler } from 'express';

export type RequestHandlerWithBody<TBody extends object> = RequestHandler<
  never,
  any,
  TBody
>;

export type RequestHandlerWithDynamicId<
  TKey extends string = 'id',
  TBody extends object = {}
> = RequestHandler<{ [key in TKey]: string }, any, TBody>;
