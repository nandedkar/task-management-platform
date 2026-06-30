import z from 'zod';

export const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),

    APP_NAME: z.string().default('Workspace API'),
    PORT: z.coerce.number().default(5000),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    JWT_ACCESS_SECRET: z.string().default('dev-access-secret-change-me-1234567890'),
    JWT_REFRESH_SECRET: z.string().default('dev-refresh-secret-change-me-1234567890'),
    ACCESS_TOKEN_EXPIRES: z.string().default('15m'),
    REFRESH_TOKEN_EXPIRES: z.string().default('7d'),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
  })
  .superRefine((data, ctx) => {
    if (data.NODE_ENV !== 'production') {
      return;
    }

    if (data.JWT_ACCESS_SECRET.length < 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 32,
        inclusive: true,
        origin: 'string',
        path: ['JWT_ACCESS_SECRET'],
        message:
          'JWT_ACCESS_SECRET must be at least 32 characters in production.',
      });
    }

    if (data.JWT_REFRESH_SECRET.length < 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 32,
        inclusive: true,
        origin: 'string',
        path: ['JWT_REFRESH_SECRET'],
        message:
          'JWT_REFRESH_SECRET must be at least 32 characters in production.',
      });
    }
  });
