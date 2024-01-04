import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum NonConformityEnum {
  CONFORME = 'Conforme',
  REPROCESO = 'Reproceso',
  REPROCESO_INMEDIATO = 'Reproceso inmediato',
  DAÑO_TAMBOR = 'Daño tambor',
}
export class NonConformityDto {
  @IsEnum(NonConformityEnum)
  @ApiProperty()
  name: NonConformityEnum;
}
