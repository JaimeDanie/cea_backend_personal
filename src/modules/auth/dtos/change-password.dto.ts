import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'password' })
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'confirmation' })
  readonly confirmation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'code' })
  readonly code: string;
}

export class RequestChangePassword {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  readonly email: string;
}
