import 'reflect-metadata';
import './container';

import app from './app';
import { sequelize } from './config/database';
import { redisClient } from './config/redis';
import { env } from './config/env';
import { printBanner } from './common/startup/banner';

async function bootstrap() {
  await sequelize.authenticate();
  console.log('Database connected successfully.');
  await redisClient.connect();
  console.log('Redis connected successfully.');
  app.listen(env.port, () => {
    printBanner();
  });
}

bootstrap().catch((error) => {
  console.error('Error during server bootstrap:', error);
});
