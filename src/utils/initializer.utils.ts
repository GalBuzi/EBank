import fs from 'fs';
import mysql from 'mysql2/promise';
import log from '@ajar/marker';
import { ConfigJson } from '../../typings.js';

export let db: mysql.Connection;
export const connect = async (
  sqlHost: string,
  sqlUser: string,
  sqlPassword: string,
  sqlDB: string,
  sqlPort: number,
) => {
  if (db) return db;
  db = await mysql.createConnection({
    host: sqlHost,
    user: sqlUser,
    password: sqlPassword,
    database: sqlDB,
    port: sqlPort,
  });
  await db.connect();
  log.magenta('Connected to MySQL DB');
};
export const initConfigFile = () => {
  return JSON.parse(
    fs.readFileSync(process.cwd() + '/config.json', 'utf-8'),
  ) as ConfigJson;
};
