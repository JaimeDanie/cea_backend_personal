import DatabaseConfig from './database.config';
import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT) || 3001,
  database: {
    ...DatabaseConfig(),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
