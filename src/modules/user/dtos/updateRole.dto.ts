import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
