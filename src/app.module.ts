import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SiteModule } from './modules/site/site.module';

import { OrderModule } from './modules/order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './modules/products/products.module';
import { FillerModule } from './modules/filler/filler.module';
import { TubularModule } from './modules/tubular/tubular.module';
import { NonConformityModule } from './modules/non-conformity/non-conformity.module';
import { FillingCameraModule } from './modules/filling-camera/filling-camera.module';
import { OperateModule } from './modules/operate/operate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
      load: [appConfig],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'jaimedaniel.bm91@gmail.com',
          pass: 'ourobaocjmajeacx',
        },
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    SiteModule,
    OrderModule,
    ProductsModule,
    FillerModule,
    TubularModule,
    NonConformityModule,
    FillingCameraModule,
    OperateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
