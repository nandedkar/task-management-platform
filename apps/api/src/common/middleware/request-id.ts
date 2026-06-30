import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = randomUUID();
  req.requestId = id;
  req.headers['x-request-id'] = id;
  res.setHeader('X-Request-Id', id);
  next();
}
