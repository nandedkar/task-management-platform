export const apiResponse = (
  success: boolean,
  message: string,
  data?: unknown
) => ({
  success,
  message,
  data
});