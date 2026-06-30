import 'dotenv/config';

export const authConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET!,

  refreshSecret: process.env.JWT_REFRESH_SECRET!,

  accessExpiry:
    process.env.ACCESS_TOKEN_EXPIRES ?? '15m',

  refreshExpiry:
    process.env.REFRESH_TOKEN_EXPIRES ?? '7d',
};