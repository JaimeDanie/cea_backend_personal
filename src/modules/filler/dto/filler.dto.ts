import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';


export class FillerDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filler: string;
}
