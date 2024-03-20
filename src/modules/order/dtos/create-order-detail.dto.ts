import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
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
  @IsString()
  @IsNotEmpty()
  bolsa: string;
}

export class DurationFillerDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
}

export class UpdateOrderDetailDTO {
  @ApiPropertyOptional()
  @IsOptional()
  readonly sello?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly weight?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly nonConformity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly novedad?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly lotebolsa?: string;
}

export class CreateMoreOrderDetailDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  readonly num_stickers: number;
}

export class UpdateFillingOrderDetailDto {
  @ApiProperty()
  @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/)
  readonly hours: string;
}
