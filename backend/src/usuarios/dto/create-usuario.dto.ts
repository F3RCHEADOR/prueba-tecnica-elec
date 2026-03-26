import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @MinLength(5)
  password: string;
}

