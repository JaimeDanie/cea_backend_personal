import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    readonly sapOrderNumber: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    readonly productName: string

    @IsString()
    @IsNotEmpty()
    readonly filler: string

    @IsString()
    @IsNotEmpty()
    readonly operator: string
}