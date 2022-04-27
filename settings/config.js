import dotenv from 'dotenv';
dotenv.config()

export const env = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT
}