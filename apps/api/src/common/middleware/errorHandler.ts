import { Response, Request } from 'express';
import { AppException } from '../exceptions/app.exception';

// type ErrorWithStatus = {
//   statusCode?: number;
//   message?: string;
// };

export const errorHandler = (err: unknown, req: Request, res: Response) => {
  if (err instanceof AppException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });

  // if (res.headersSent) {
  //   return next(err as Error);
  // }

  // const error = err as ErrorWithStatus;

  // res.status(error.statusCode || 500).json({
  //   success: false,
  //   message: error.message || "Internal Server Error",
  // });
};
