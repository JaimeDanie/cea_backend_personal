import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dtos/sign-in.dto";
import { BadRequestException, Inject, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { ChangePasswordDto } from "../dtos/change-password.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";

import { AppDataSource } from "src/database/data-source";

export class AuthService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService
  ) { }

  async signIn({ email, password }: SignInDto) {

    const user = await AppDataSource.manager.findOne(User, { where: { email } })

    if (!user || !await bcrypt.compare(password, user.password) || !user.isActive) {
      throw new UnauthorizedException()
    }

    const payload = {
      sub: user.id,
      email: user.email
    }

    const access_token = await this.jwtService.signAsync(payload)
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ currentToken: access_token })
      .where({ id: user.id })
      .execute()

    const { password: pass, currentToken, ...currentUser } = await AppDataSource.manager.findOne(User, { where: { email } })

    return {
      currentUser, access_token
    }
  }

  async signOut(token) {
    const payload = token.split(" ")[1]
    const user = await AppDataSource.manager.findOne(User, { where: { currentToken: payload } })
    if (!user || !user.isActive) {
      throw new UnauthorizedException()
    }

    const jwtDecoded = await this.jwtService.decode(payload)
    if (user.id !== jwtDecoded.sub) {
      throw new UnauthorizedException()
    }

    const updateResult = await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ currentToken: null })
      .where({ id: user.id })
      .execute()

    console.log(`User ${jwtDecoded.email} logged out.`)
    return { message: 'signed out' }

  }

  // async changePassword(id: string, {password, confirmation}: ChangePasswordDto){
  //   if(password !== confirmation){
  //     throw new BadRequestException()
  //   }

  //   return this.userService.updatePassword(id, password)
  // }
}