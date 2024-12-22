import type { RequestHandler, ErrorRequestHandler } from 'express';

import { ServerError } from '../utils/ServerError';

const globalErrorHandler: ErrorRequestHandler = (
  error: unknown,
  req,
  res,
  next
) => {
  console.error(JSON.stringify(error, null, 2));

  if (error instanceof ServerError) {
    const status = error.status;
    const message = error.message;
    const payload = error.payload;

    return void res.status(status).json({ message, payload });
  }

  if (error instanceof Error) {
    return void res.status(500).json({ message: error.message });
  }

  res.status(500).json({ message: 'Internal Server Error. ' });
};

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({
    message: `Endpoint not found. Path at ${req.originalUrl} does not exist!`,
  });
};

export default { globalErrorHandler, notFound };
