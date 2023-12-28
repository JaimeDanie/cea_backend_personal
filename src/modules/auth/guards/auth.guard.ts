import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const validUser = this.validateUser(payload);
      if (validUser) {
        request['user'] = { ...payload, token };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }

  private async validateUser(payload: any): Promise<boolean> {
    const user = await AppDataSource.manager.findOne(User, {
      where: { email: payload.email },
    });
    if (user && user.id === payload.sub) {
      return true;
    }
    return false;
  }
}
