import { Response } from 'express';
import { ApiResponseMeta, createApiResponse } from './api-response';

type ResponseMetaInput = Omit<ApiResponseMeta, 'timestamp'> & {
  timestamp?: string;
};

function resolveRequestId(res: Response): string | undefined {
  const headerValue = res.getHeader('X-Request-Id');

  if (typeof headerValue === 'string') {
    return headerValue;
  }

  if (Array.isArray(headerValue)) {
    return headerValue[0];
  }

  return undefined;
}

export function successResponse<T>(
  res: Response,
  status: number,
  message: string,
  data?: T,
  meta?: ResponseMetaInput,
) {
  return res.status(status).json(
    createApiResponse({
      success: true,
      message,
      data,
      meta: {
        ...meta,
        requestId: meta?.requestId ?? resolveRequestId(res),
        timestamp: meta?.timestamp ?? new Date().toISOString(),
      },
    }),
  );
}
