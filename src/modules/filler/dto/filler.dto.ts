import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class FillerDto {
  @Max(5)
  @Min(1)
  @ApiProperty()
  filler: number;

  @Max(3)
  @Min(1)
  @ApiProperty()
  tubullar: number;
}
