import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCiudadeDto {
  @ApiProperty({
    example: 'Bucaramanga',
    description: 'Ciudad del departamento de Santander',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: '213213asdasd-sadas-21312-sadas',
    description: 'Identificacion del departamento',
  })
  @IsUUID()
  @IsNotEmpty()
  departamento_id: string;

}
