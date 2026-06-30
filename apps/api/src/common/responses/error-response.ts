import { Response } from 'express';
import { ApiResponse } from './api-response';

export function errorResponse<T>(
  res: Response,
  status: number,
  message: string,
  data?: T,
  meta?: unknown,
) {
  return res
    .status(status)
    .json(new ApiResponse<T>(false, message, data, meta));
}
