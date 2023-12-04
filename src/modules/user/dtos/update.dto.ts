import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator"

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly firstName: string

  @IsString()
  @IsOptional()
  readonly lastName: string

  @IsString()
  @IsOptional()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly password: string
}