import { DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  async useFactory(config: ConfigService) {
    const dbConfig = {
      type: config.get('database.type'),
      host: config.get('database.host'),
      port: +config.get('database.port'),
      username: config.get('database.user'),
      password: config.get('database.pass'),
      database: config.get('database.name'),
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      namingStrategy: new SnakeNamingStrategy()
    } as DataSourceOptions

    return dbConfig
  },
  inject: [ConfigService]
})