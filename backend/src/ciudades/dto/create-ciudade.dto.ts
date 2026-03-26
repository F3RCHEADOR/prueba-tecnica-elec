import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCiudadeDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsUUID()
  @IsNotEmpty()
  departamento_id: string;

}
