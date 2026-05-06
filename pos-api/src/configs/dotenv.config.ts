import 'dotenv/config';

export const CORS_WHITELIST = process.env.CORS_WHITELIST;
export const DATABASE_URL = process.env.DATABASE_URL;
export const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
export const JWT_SECRET_ACCOUNT_ACTIVATION =
  process.env.JWT_SECRET_ACCOUNT_ACTIVATION;
export const JWT_SECRET_AUTH_LOGIN=process.env.JWT_SECRET_AUTH_LOGIN