import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario y retorna un JWT válido',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales del usuario',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
    schema: {
      example: {
        statusCode: 401,
        message: 'Credenciales invalidas',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error al iniciar sesion',
        error: 'Internal Server Error',
      },
    },
  })
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }
}