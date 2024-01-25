import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class OrderConfigDto {
  @ApiProperty()
  @IsNumberString()
  numlote: string;
}
