import { Expose } from "class-transformer"
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator"

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Expose({ name: 'first_name' })
  readonly firstName: string

  @IsString()
  @IsOptional()
  @Expose({ name: 'last_name' })
  readonly lastName: string

  @IsString()
  @IsOptional()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly password: string
}