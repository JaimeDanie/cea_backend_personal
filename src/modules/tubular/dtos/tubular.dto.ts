import { ApiProperty } from '@nestjs/swagger';

export class TubularDto {
  @ApiProperty()
  name: string;
}
