import { Expose } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'password' })
  readonly password: string

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'password_confirmation' })
  readonly confirmation: string
}