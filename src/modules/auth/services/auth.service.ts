import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../user/services/user.service";
import { SignInDto } from "../dtos/sign-in.dto";
import { BadRequestException, Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { ChangePasswordDto } from "../dtos/change-password.dto";
import { User } from "src/modules/user/entities/user.entity";

export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ){}

  async signIn({email, password}: SignInDto){
    const user = await this.userService.getUserByEmail(email)

    if(!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, email: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async changePassword(id: string, {password, confirmation}: ChangePasswordDto){
    if(password !== confirmation){
      throw new BadRequestException()
    }

    return this.userService.updatePassword(id, password)
  }
}