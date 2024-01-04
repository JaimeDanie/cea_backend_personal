import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class TubularDto {
  @Min(1)
  @Max(3)
  @ApiProperty()
  name: number;
}
