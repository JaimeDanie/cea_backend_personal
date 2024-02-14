import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
