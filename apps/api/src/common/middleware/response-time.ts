import { Request, Response, NextFunction } from 'express';

export const responseTimeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = process.hrtime.bigint();

  const originalWriteHead = res.writeHead.bind(res);
  res.writeHead = ((...args: Parameters<Response['writeHead']>) => {
    const finished = process.hrtime.bigint();
    const duration = Number(finished - start) / 1_000_000;

    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${duration.toFixed(2)} ms`);
    }

    return originalWriteHead(...args);
  }) as Response['writeHead'];

  res.on('finish', () => {
    const finished = process.hrtime.bigint();
    const duration = Number(finished - start) / 1_000_000; // Convert to milliseconds
    console.log(`Request to ${req.originalUrl} took ${duration.toFixed(2)} ms`);
  });

  next();
};
