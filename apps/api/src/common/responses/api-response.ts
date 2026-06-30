export interface ApiResponseMeta {
  page?: number;
  limit?: number;
  totalItems?: number;
  totalPages?: number;
  requestId?: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
  meta?: ApiResponseMeta;
}

export function createApiResponse<T>(payload: ApiResponse<T>): ApiResponse<T> {
  return payload;
}
