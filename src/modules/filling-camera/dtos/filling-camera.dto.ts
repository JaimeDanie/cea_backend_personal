import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum FillingCameraEnum {
  A = 'A',
  B = 'B',
}
export enum FillingCameraStatusEnum {
  ACTIVO = 'ACTIVO',
  BLOQUEADO = 'BLOQUEADO',
}
export class FilligCameraDto {
  @IsEnum(FillingCameraEnum)
  @ApiProperty()
  name: FillingCameraEnum;
}
