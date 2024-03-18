import { ApiProperty } from '@nestjs/swagger';


export class FillerDto {

  @ApiProperty()
  filler: string;
}
