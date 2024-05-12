import dotenv from 'dotenv';
dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const cookie_secret = process.env.COOKIE_SECRET;
export const log_dir = process.env.LOG_DIR;