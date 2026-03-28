import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

  @ApiProperty({ example: 'usuario1@gmail.com', description: 'Correo del usuario', })
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario (mínimo 5 caracteres)',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  password: string;
}

