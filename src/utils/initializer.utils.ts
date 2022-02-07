import fs from 'fs';
import mysql from 'mysql2/promise';
import log from '@ajar/marker';
import { ConfigJson } from '../../typings.js';

export let db: mysql.Connection;
export async function connect(
  constants : ConfigJson,
): Promise<mysql.Connection | void> {
  if (db) return db;
  db = await mysql.createConnection({
    host: constants.DB_SQL_HOST,
    user: constants.DB_SQL_USER,
    password: constants.DB_SQL_PWD,
    database: constants.DB_SQL_NAME,
    port: constants.DB_SQL_PORT,
  });
  await db.connect();
  log.magenta('Connected to MySQL DB');
}
export function initConfigFile(): ConfigJson {
  return JSON.parse(
    fs.readFileSync(process.cwd() + '/config.json', 'utf-8'),
  ) as ConfigJson;
}

export function initRequiredParams() : Map<string,string[]> {
  const requiredParams = new Map<string, string[]>();
  requiredParams.set('individual', ['individual_id','first_name','last_name','currency']);
  requiredParams.set('business', ['compay_id','company_name','currency']);
  requiredParams.set('family', ['owners','currency']);
  return requiredParams;
}
