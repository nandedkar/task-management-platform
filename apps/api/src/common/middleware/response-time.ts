import { Request, Response, NextFunction } from 'express';

export const responseTimeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const finished = process.hrtime.bigint();
    const duration = Number(finished - start) / 1_000_000; // Convert to milliseconds
    res.setHeader('X-Response-Time', `${duration.toFixed(2)} ms`);
    console.log(`Request to ${req.originalUrl} took ${duration.toFixed(2)} ms`);
  });
  next();
};
