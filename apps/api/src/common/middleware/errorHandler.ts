import { Response, Request } from 'express';
import { AppException } from '../exceptions/app.exception';
import { HttpStatus } from '../constants/http-status';

export const errorHandler = (err: unknown, req: Request, res: Response) => {
  if (err instanceof AppException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal Server Error',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};
