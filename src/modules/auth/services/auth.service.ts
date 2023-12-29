import { AppDataSource } from './../../../database/data-source';
import { UserService } from './../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dtos/sign-in.dto';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { User } from 'src/modules/user/entities/user.entity';

export class AuthService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    const user = await AppDataSource.manager.findOne(User, {
      where: { email },
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      !user.isActive
    ) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ currentToken: access_token })
      .where({ id: user.id })
      .execute();

    const {
      password: pass,
      currentToken,
      ...currentUser
    } = await AppDataSource.manager.findOne(User, { where: { email } });

    return {
      currentUser,
      access_token,
    };
  }

  async signOut(userLogIn: any) {
    const { email, token } = userLogIn;
    const user = await AppDataSource.manager.findOne(User, {
      where: { currentToken: token },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ currentToken: null })
      .where({ id: user.id })
      .execute();

    console.log(`User ${email} logged out.`);
    return { message: 'signed out' };
  }

  async changePassword(
    id: string,
    { password, confirmation }: ChangePasswordDto,
  ) {
    if (password !== confirmation) {
      throw new BadRequestException();
    }

    return this.userService.updatePassword(id, password);
  }
}
