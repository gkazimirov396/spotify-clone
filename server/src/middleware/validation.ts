import type { RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

import { ServerError } from '../utils/ServerError';

interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export function validateRequest(validators: RequestValidators): RequestHandler {
  return async (req, res, next) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }

      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }

      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.format() as any;
        const validationPaths = Object.keys(validationErrors).slice(1);

        const err = new ServerError(
          422,
          null,
          validationPaths.map(path => ({
            path,
            message: validationErrors[path]._errors[0],
          }))
        );

        next(err);
      }
    }
  };
}
