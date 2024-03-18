import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  @IsString()
  readonly supervisor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly tubular: string;
}
