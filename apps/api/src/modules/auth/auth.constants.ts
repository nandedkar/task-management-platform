export const AUTH_CONSTANTS = {
  ACCESS_TOKEN_EXPIRES: '15m',

  REFRESH_TOKEN_EXPIRES: '7d',

  BCRYPT_ROUNDS: 12,

  JWT_ISSUER: 'workspace-api',

  JWT_AUDIENCE: 'workspace-client',
} as const;
