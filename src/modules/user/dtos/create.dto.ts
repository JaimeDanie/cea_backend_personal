import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, isArray } from "class-validator"
import { Role } from "../entities/role.entity"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string

  @IsBoolean()
  @IsOptional()
  readonly isActive:boolean

  @IsBoolean()
  @IsOptional()
  readonly isAdmin:boolean

  @IsArray()
  @IsOptional()
  readonly roles: Role[]
}