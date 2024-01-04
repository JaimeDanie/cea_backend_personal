import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';

export class ResponsePermissionDto {
  @ApiProperty()
  success: boolean;

  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional()
  data: Permission;
}

export class ResponseUserDto {
  @ApiProperty()
  success: boolean;

  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional()
  data: User;
}
