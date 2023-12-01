import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SiteModule } from './modules/site/site.module';
import configuration from './config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration]
    }),
    DatabaseModule,
    UserModule,
    //AuthModule,
    SiteModule
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule {
}
