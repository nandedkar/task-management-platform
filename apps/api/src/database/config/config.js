require("dotenv").config();
const { existsSync } = require("fs");

const isRunningInDocker = existsSync("/.dockerenv");

function resolveHost(host) {
  if (!host) {
    return host;
  }

  if (!isRunningInDocker && host === "mysql") {
    return "localhost";
  }

  return host;
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: resolveHost(process.env.DB_HOST),
    port: process.env.DB_PORT,
    dialect: "mysql",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: resolveHost(process.env.DB_HOST),
    port: process.env.DB_PORT,
    dialect: "mysql",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: resolveHost(process.env.DB_HOST),
    port: process.env.DB_PORT,
    dialect: "mysql",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
};