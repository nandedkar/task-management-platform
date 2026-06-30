import 'dotenv/config';
import { envSchema } from './env.schema';

const validatedEnv = envSchema.parse(process.env);

export const authConfig = {
  accessSecret: validatedEnv.JWT_ACCESS_SECRET,

  refreshSecret: validatedEnv.JWT_REFRESH_SECRET,

  accessExpiry: validatedEnv.ACCESS_TOKEN_EXPIRES,

  refreshExpiry: validatedEnv.REFRESH_TOKEN_EXPIRES,
};