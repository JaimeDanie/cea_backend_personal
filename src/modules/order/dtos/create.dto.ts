import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly tubular: string;
}
