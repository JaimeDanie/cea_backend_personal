import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly saporder: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly product: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly filler: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly operate: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly supervisor?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly tubular: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly turno?: string;
}
