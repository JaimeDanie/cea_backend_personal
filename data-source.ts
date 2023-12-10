import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'
import { User } from "./src/modules/user/entities/user.entity";
dotenv.config()

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: [User],
  migrations: [ "./src/database/migrations/*{.ts,.js}" ],
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
