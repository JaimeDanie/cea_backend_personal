import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true, 
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: '30d' }
      }),
    })
  ],
  providers: [
    AuthService
  ],
  controllers: [AuthController]
})
export class AuthModule {}