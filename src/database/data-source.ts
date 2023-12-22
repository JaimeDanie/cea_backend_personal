import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/src/**/*.entity.js'],
  migrations: [ "src/config/migrations/*{.ts,.js}" ],
  migrationsTableName: "migrations",
  options: {
    encrypt: false
  }
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
