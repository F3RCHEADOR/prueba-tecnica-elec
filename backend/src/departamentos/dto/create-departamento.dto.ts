import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartamentoDto {
  @ApiProperty({
    example: 'Santander',
    description: 'Nombre del departamento',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
