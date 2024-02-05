import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

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

export class UpdateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumberString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  characteristiclote?: string;
}
