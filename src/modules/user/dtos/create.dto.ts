import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'first_name' })
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'last_name' })
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}