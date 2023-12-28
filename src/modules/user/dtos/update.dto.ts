import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Role } from '../entities/role.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(2)
  readonly firstName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(2)
  readonly lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEmail()
  @MinLength(2)
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly password: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  readonly roles: Role[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  readonly isAdmin: boolean;
}
