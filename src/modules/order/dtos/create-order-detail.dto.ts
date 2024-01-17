import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDetailDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  readonly num_stickers: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly filligCamera: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly bolsa: number;
}

export class DurationFillerDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
}

export class UpdateOrderDetailDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly sello: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly weight: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nonConformity: string;
}
