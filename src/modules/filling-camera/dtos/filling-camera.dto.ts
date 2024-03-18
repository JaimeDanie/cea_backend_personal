import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum FillingCameraStatusEnum {
  ACTIVO = 'ACTIVO',
  BLOQUEADO = 'BLOQUEADO',
}
export class FilligCameraDto {
  @ApiProperty()
  name: string;
}
