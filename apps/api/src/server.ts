import 'reflect-metadata';
import './container';

import app from './app';
import { sequelize } from './config/database';
import { redisClient } from './config/redis';
import { env } from './config/env';

async function bootstrap() {
  await sequelize.authenticate();
  console.log('Database connected successfully.');
  await redisClient.connect();
  console.log('Redis connected successfully.');
  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Error during server bootstrap:', error);
});
