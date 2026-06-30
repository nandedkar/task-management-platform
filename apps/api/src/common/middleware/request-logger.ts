import { Request, Response, NextFunction } from 'express';

import { logger } from '../logger/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const started = Date.now();

  res.on('finish', () => {
    logger.info({
      requestId: req.requestId,

      method: req.method,

      url: req.originalUrl,

      status: res.statusCode,

      duration: `${Date.now() - started} ms`,

      ip: req.ip,

      userAgent: req.headers['user-agent'],
    });
  });

  next();
}
