import { Request, Response } from 'express';
import { HttpStatus } from '../constants/http-status';

export function notFoundHandler(req: Request, res: Response) {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
}
