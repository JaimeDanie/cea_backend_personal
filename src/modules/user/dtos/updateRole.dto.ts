import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
}