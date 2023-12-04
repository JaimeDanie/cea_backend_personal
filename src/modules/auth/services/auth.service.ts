import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../user/services/user.service";
import { SignInDto } from "../dtos/sign-in.dto";
import { BadRequestException, Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { ChangePasswordDto } from "../dtos/change-password.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";

export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ){}

  async signIn({email, password}: SignInDto){
    const user = await this.userRepository.findOne({ where: { email }})

    if(!user || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException()
    }

    const { password: pass, ... current_user  } = user

    const payload = { 
      sub: user.id, 
      email: user.email
    }

    return {
      current_user,
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signOut(token) {
    const jwtDecoded = await this.jwtService.decode(token.split(" ")[1])
    console.log(`User ${ JSON.stringify(jwtDecoded) } logged out.`)
    return { message: 'signed out' }
  }

  // async changePassword(id: string, {password, confirmation}: ChangePasswordDto){
  //   if(password !== confirmation){
  //     throw new BadRequestException()
  //   }

  //   return this.userService.updatePassword(id, password)
  // }
}