
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateLoteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly status: string;

}