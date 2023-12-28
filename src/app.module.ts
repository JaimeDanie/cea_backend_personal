import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SiteModule } from './modules/site/site.module';
import AppConfig from 'src/config/app.config';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
      load: [AppConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    // OrderModule, //comentado porque da error
    SiteModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
