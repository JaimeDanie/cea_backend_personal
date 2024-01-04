import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum OperateEnum {
  SUPERVISOR = 'Supervisor',
  LIDER = 'Lider',
  OPERADOR = 'Operador',
  ANALISTA_LAB = 'Analista Lab',
}

export class OperateDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @IsEnum(OperateEnum)
  @ApiProperty()
  type: OperateEnum;
}
