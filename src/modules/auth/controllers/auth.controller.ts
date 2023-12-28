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
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @UseGuards(AuthGuard)
  @Post('change-password')
  changePassword(
    @Request() req,
    @Body() { password, confirmation }: ChangePasswordDto,
  ) {
    return this.authService.changePassword(req.user.sub, {
      password,
      confirmation,
    });
  }
}
