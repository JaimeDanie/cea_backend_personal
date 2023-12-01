import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],

  async useFactory(config: ConfigService) {

    const dbConfig = {
      type: config.get('database.type'),
      host: config.get('database.host'),
      port: +config.get('database.port'),
      username: config.get('database.user'),
      password: config.get('database.pass'),
      database: config.get('database.name'),
      autoLoadEntities: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        trustServerCertificate: true
      },
      namingStrategy: new SnakeNamingStrategy()
    } as DataSourceOptions

    return dbConfig
  }
})