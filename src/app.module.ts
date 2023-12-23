import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SiteModule } from './modules/site/site.module';
import AppConfig from 'src/config/app.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import {dataSource, dataSourceOptions} from 'src/config/data-source'
import configuration from './config/configuration';
import { OrderModule } from './modules/order/order.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: './.env',
      load: [ AppConfig ]
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
   // OrderModule, //comentado porque da error
    SiteModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
