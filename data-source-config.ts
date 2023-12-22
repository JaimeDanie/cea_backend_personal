import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: "mssql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [ "src/config/migrations/*{.ts,.js}" ],
  migrationsTableName: "migrations",
  logging: true,
  options: {
    encrypt: false
  }
}