import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {

    try {

      const usuario = await this.usuarioService.findOne(loginDto.correo);

      if (!usuario) throw new UnauthorizedException('credenciales invalidas');

      const comparedPassword = await bcrypt.compare(loginDto.password, usuario.password)

      if (!comparedPassword) throw new UnauthorizedException('Error en las credenciales');

      const payload = { sub: usuario.id, correo: usuario.correo };
      return { access_token: this.jwtService.sign(payload) };

    } catch (error) {
      console.log(error)
      if (error instanceof UnauthorizedException) throw error;
      if (error instanceof BadRequestException) throw new UnauthorizedException('Credenciales invalidas');
      throw new InternalServerErrorException('Error al iniciar sesion');
    }
  }
}
