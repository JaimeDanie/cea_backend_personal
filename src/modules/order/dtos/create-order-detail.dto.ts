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
  num_stickers: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filligCamera: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bolsa: number;
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

export class CreateMoreOrderDetailDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  readonly num_stickers: number;
}
