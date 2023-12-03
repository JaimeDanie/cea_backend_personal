import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private jwtService: JwtService
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const token = this.extractTokenFromHeader(request)

    if(!token){
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token)
      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException()
    }
    
    return true
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type == 'Bearer' ? token : undefined
  }
}