import dotenv from "dotenv";
import { existsSync } from "fs";

dotenv.config();

const isRunningInDocker = existsSync("/.dockerenv");

function resolveHost(host: string | undefined): string {
  if (!host) {
    return host ?? "";
  }

  if (!isRunningInDocker && host === "mysql") {
    return "localhost";
  }

  if (!isRunningInDocker && host === "redis") {
    return "localhost";
  }

  return host;
}

export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),

  dbHost: resolveHost(process.env.DB_HOST),
  dbPort: Number(process.env.DB_PORT),

  dbName: process.env.DB_NAME!,
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,

  redisHost: resolveHost(process.env.REDIS_HOST),
  redisPort: Number(process.env.REDIS_PORT)
};