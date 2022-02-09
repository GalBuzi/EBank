export {};
declare global {
  namespace Express {
    interface Request {
      request_id: string;
      user_id: string;
    }
  }
}

export interface ConfigJson {
  NODE_ENV: string;
  HOST: string;
  PORT: number;
  APP_SECRET: string;
  ACCESS_TOKEN_EXPIRATION: string;
  REFRESH_TOKEN_EXPIRATION: string;
  SALT_ROUNDS: string;
  DB_SQL_HOST: string;
  DB_SQL_PORT: number;
  DB_SQL_USER: string;
  DB_SQL_PWD: string;
  DB_SQL_NAME: string;
}

