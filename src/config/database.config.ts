import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import * as dotenv from 'dotenv'
dotenv.config()

const DatabaseConfig = () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
  // autoLoadEntities: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // synchronize: false,
  ssl: true,
  options: {
    encrypt: false
  },
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'migrations',
  migrations: [
    "src/config/migrations/*{.ts,.js}"
  ],
  cli: {
    migrationsDir: "src/config/migrations"
  }
})

export default DatabaseConfig