import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  characteristiclote: string;
}
