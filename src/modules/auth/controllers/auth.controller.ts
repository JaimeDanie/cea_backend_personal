import { User } from 'src/modules/user/entities/user.entity';
import {
  Body,
  Controller,
  Headers,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import {
  ChangePasswordDto,
  RequestChangePassword,
} from '../dtos/change-password.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn({ email, password });
  }

  @UseGuards(AuthGuard)
  @Post('sign-out')
  signOut(@Request() req) {
    console.log('REQUEST', req.user);
    return this.authService.signOut(req.user);
  }

  @Post('change-password')
  changePassword(
    @Request() req,
    @Body() { password, confirmation, code }: ChangePasswordDto,
  ) {
    return this.authService.changePassword({
      password,
      confirmation,
      code,
    });
  }

  @Post('request-change-password')
  requestResetPassword(
    @Body() requestPassword: RequestChangePassword,
  ): Promise<User> {
    return this.authService.requestChangePassword(requestPassword.email);
  }
}
