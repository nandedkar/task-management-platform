import { Response, Request, NextFunction } from "express";

type ErrorWithStatus = {
  statusCode?: number;
  message?: string;
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err as Error);
  }

  const error = err as ErrorWithStatus;

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
