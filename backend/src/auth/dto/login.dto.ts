import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@gmail.com',
    description: 'Correo electrónico del usuario',
  })
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