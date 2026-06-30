import { Response } from 'express';
import { ApiResponse } from './api-response';

export function successResponse<T>(
  res: Response,
  status: number,
  message: string,
  data?: T,
  meta?: unknown,
) {
  return res.status(status).json(new ApiResponse(true, message, data, meta));
}
