import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwt as jwtConstants } from "./constants/jwt.constants";

@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      global: true, 
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '30d' }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}