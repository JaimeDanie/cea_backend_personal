import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, IsBoolean } from "class-validator"

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  readonly firstName: string

  @IsString()
  @IsOptional()
  @MinLength(2)
  readonly lastName: string

  @IsString()
  @IsOptional()
  @IsEmail()
  @MinLength(2)
  readonly email: string

  @IsString()
  @IsOptional()
  readonly password: string

  @IsBoolean()
  @IsOptional()
  readonly isActive:boolean

  @IsBoolean()
  @IsOptional()
  readonly isAdmin:boolean
}