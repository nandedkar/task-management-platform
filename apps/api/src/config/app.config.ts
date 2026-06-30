import 'dotenv/config';

export const appConfig = {
  name: process.env.APP_NAME ?? 'Workspace API',

  env: process.env.NODE_ENV ?? 'development',

  port: Number(process.env.PORT ?? 5000),
};
