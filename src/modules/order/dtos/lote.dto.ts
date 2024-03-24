
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoteDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lider: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    analista: string;

    @ApiPropertyOptional()
    @IsOptional()
    brix: number;

    @ApiPropertyOptional()
    @IsOptional()
    ph: number;

    @ApiPropertyOptional()
    @IsOptional()
    acidez: number;

    @ApiPropertyOptional()
    @IsOptional()
    materialextranio: string;

    @ApiPropertyOptional()
    @IsOptional()
    puntonegro: number;

    @ApiPropertyOptional()
    @IsOptional()
    porcentajesolido: number;

    @ApiPropertyOptional()
    @IsOptional()
    almidon: string;

    @ApiPropertyOptional()
    @IsOptional()
    brixreconstruido: number;

    @ApiPropertyOptional()
    @IsOptional()
    turbiedad: number;

    @ApiPropertyOptional()
    @IsOptional()
    clarity: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorabsorbancia: number;

    @ApiPropertyOptional()
    @IsOptional()
    colortransmitancia: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorl: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorc: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorh: number;

    @ApiPropertyOptional()
    @IsOptional()
    colora: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorb: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorl2: number;

    @ApiPropertyOptional()
    @IsOptional()
    colora2: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorb2: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorapariencia: string;

    @ApiPropertyOptional()
    @IsOptional()
    consistencia5: number;

    @ApiPropertyOptional()
    @IsOptional()
    consistencia20: number;

    @ApiPropertyOptional()
    @IsOptional()
    consistencia30: number;

    @ApiPropertyOptional()
    @IsOptional()
    viscosidadcp: number;

    @ApiPropertyOptional()
    @IsOptional()
    viscosidadtorque: number;

    @ApiPropertyOptional()
    @IsOptional()
    etanol: number;

    @ApiPropertyOptional()
    @IsOptional()
    acidolatico: number;

    @ApiPropertyOptional()
    @IsOptional()
    pruebaorgaolor: string;

    @ApiPropertyOptional()
    @IsOptional()
    pruebaorgasabor: string;

    @ApiPropertyOptional()
    @IsOptional()
    pruebaorgatextura: string;

    @ApiPropertyOptional()
    @IsOptional()
    verificacionpn: string;

    @ApiPropertyOptional()
    @IsOptional()
    testblotter: string;

    @ApiPropertyOptional()
    @IsOptional()
    porcentajepulpa: number;

    @ApiPropertyOptional()
    @IsOptional()
    aerobiosmesofilos: number;

    @ApiPropertyOptional()
    @IsOptional()
    aerobiostermofilos: number;

    @ApiPropertyOptional()
    @IsOptional()
    coliformestotales: number;

    @ApiPropertyOptional()
    @IsOptional()
    coliformesfecales: number;

    @ApiPropertyOptional()
    @IsOptional()
    esporas: number;

    @ApiPropertyOptional()
    @IsOptional()
    anaerobios: number;

    @ApiPropertyOptional()
    @IsOptional()
    lactobacillus: number;

    @ApiPropertyOptional()
    @IsOptional()
    moho: number;

    @ApiPropertyOptional()
    @IsOptional()
    levaduras: number;

    @ApiPropertyOptional()
    @IsOptional()
    mohotermoresistentes: number;

    @ApiPropertyOptional()
    @IsOptional()
    salmonella: number;

    @ApiPropertyOptional()
    @IsOptional()
    alicyclobacillus: number;

    @ApiPropertyOptional()
    @IsOptional()
    listeria: number;

    @ApiPropertyOptional()
    @IsOptional()
    conteohoward: number;

    @ApiPropertyOptional()
    @IsOptional()
    pseudomonas: number;

    @ApiPropertyOptional()
    @IsOptional()
    ecoli: number;

    @ApiPropertyOptional()
    @IsOptional()
    tab: number;

    @ApiPropertyOptional()
    @IsOptional()
    guayacol: number;

    @ApiPropertyOptional()
    @IsOptional()
    psicrofilos: number;
}

export class LoteDtoSeveral {


    @ApiProperty()
    @IsArray()
    lotes: [number]

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lider: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    analista: string;

    @ApiPropertyOptional()
    @IsOptional()
    brix: number;

    @ApiPropertyOptional()
    @IsOptional()
    ph: number;

    @ApiPropertyOptional()
    @IsOptional()
    acidez: number;

    @ApiPropertyOptional()
    @IsOptional()
    materialextranio: string;

    @ApiPropertyOptional()
    @IsOptional()
    puntonegro: number;

    @ApiPropertyOptional()
    @IsOptional()
    porcentajesolido: number;

    @ApiPropertyOptional()
    @IsOptional()
    almidon: string;

    @ApiPropertyOptional()
    @IsOptional()
    brixreconstruido: number;

    @ApiPropertyOptional()
    @IsOptional()
    turbiedad: number;

    @ApiPropertyOptional()
    @IsOptional()
    clarity: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorabsorbancia: number;

    @ApiPropertyOptional()
    @IsOptional()
    colortransmitancia: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorl: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorc: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorh: number;

    @ApiPropertyOptional()
    @IsOptional()
    colora: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorb: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorl2: number;

    @ApiPropertyOptional()
    @IsOptional()
    colora2: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorb2: number;

    @ApiPropertyOptional()
    @IsOptional()
    colorapariencia: string;

    @ApiPropertyOptional()
    @IsOptional()
    consistencia5: number;

    @ApiPropertyOptional()
    @IsOptional()
    consistencia20: number;

    @ApiPropertyOptional()
    @IsOptional()
    consistencia30: number;

    @ApiPropertyOptional()
    @IsOptional()
    viscosidadcp: number;

    @ApiPropertyOptional()
    @IsOptional()
    viscosidadtorque: number;

    @ApiPropertyOptional()
    @IsOptional()
    etanol: number;

    @ApiPropertyOptional()
    @IsOptional()
    acidolatico: number;

    @ApiPropertyOptional()
    @IsOptional()
    pruebaorgaolor: string;

    @ApiPropertyOptional()
    @IsOptional()
    pruebaorgasabor: string;

    @ApiPropertyOptional()
    @IsOptional()
    pruebaorgatextura: string;

    @ApiPropertyOptional()
    @IsOptional()
    verificacionpn: string;

    @ApiPropertyOptional()
    @IsOptional()
    testblotter: string;

    @ApiPropertyOptional()
    @IsOptional()
    porcentajepulpa: number;

    @ApiPropertyOptional()
    @IsOptional()
    aerobiosmesofilos: number;

    @ApiPropertyOptional()
    @IsOptional()
    aerobiostermofilos: number;

    @ApiPropertyOptional()
    @IsOptional()
    coliformestotales: number;

    @ApiPropertyOptional()
    @IsOptional()
    coliformesfecales: number;

    @ApiPropertyOptional()
    @IsOptional()
    esporas: number;

    @ApiPropertyOptional()
    @IsOptional()
    anaerobios: number;

    @ApiPropertyOptional()
    @IsOptional()
    lactobacillus: number;

    @ApiPropertyOptional()
    @IsOptional()
    moho: number;

    @ApiPropertyOptional()
    @IsOptional()
    levaduras: number;

    @ApiPropertyOptional()
    @IsOptional()
    mohotermoresistentes: number;

    @ApiPropertyOptional()
    @IsOptional()
    salmonella: number;

    @ApiPropertyOptional()
    @IsOptional()
    alicyclobacillus: number;

    @ApiPropertyOptional()
    @IsOptional()
    listeria: number;

    @ApiPropertyOptional()
    @IsOptional()
    conteohoward: number;

    @ApiPropertyOptional()
    @IsOptional()
    pseudomonas: number;

    @ApiPropertyOptional()
    @IsOptional()
    ecoli: number;

    @ApiPropertyOptional()
    @IsOptional()
    tab: number;

    @ApiPropertyOptional()
    @IsOptional()
    guayacol: number;

    @ApiPropertyOptional()
    @IsOptional()
    psicrofilos: number;
}