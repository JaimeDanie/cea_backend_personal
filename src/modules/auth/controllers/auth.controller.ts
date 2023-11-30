import { Body, Controller, Headers, Get, Post, Request, UseGuards } from "@nestjs/common";
import { SignInDto } from "../dtos/sign-in.dto";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { ChangePasswordDto } from "../dtos/change-password.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('sign-in')
  signIn(@Body() {email, password}: SignInDto){
    return this.authService.signIn({ email, password })
  }

  @Post('sign-out')
  signOut(@Headers('authorization') token, @Body() {}){
    return this.authService.signOut(token)
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  changePassword(@Request() req, @Body() {password, confirmation}: ChangePasswordDto){
    return this.authService.changePassword(req.user.sub, {password, confirmation})
  }
}