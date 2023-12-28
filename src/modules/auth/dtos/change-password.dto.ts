import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
