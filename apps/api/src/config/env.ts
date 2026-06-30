import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { redisConfig } from './redis.config';
import { databaseConfig } from './database.config';
import { appConfig } from './app.config';

dotenv.config();

const isRunningInDocker = existsSync('/.dockerenv');

function resolveHost(host: string | undefined): string {
  if (!host) {
    return host ?? '';
  }

  if (!isRunningInDocker && host === 'mysql') {
    return 'localhost';
  }

  if (!isRunningInDocker && host === 'redis') {
    return 'localhost';
  }

  return host;
}

export const env = {
  nodeEnv: appConfig.env,
  port: Number(appConfig.port),

  dbHost: resolveHost(databaseConfig.host),
  dbPort: Number(databaseConfig.port),
  dbName: databaseConfig.database,
  dbUser: databaseConfig.username,
  dbPassword: databaseConfig.password,

  redisHost: resolveHost(redisConfig.host),
  redisPort: Number(redisConfig.port),
};
