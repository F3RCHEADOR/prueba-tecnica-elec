import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
    type: Usuario
  })
  @ApiResponse({
    status: 400,
    description: 'Correo duplicado o datos inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno al crear usuario',
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener usuarios',
  })
  findAll() {
    return this.usuariosService.findAll();
  }



  @Get(':email')
  @ApiOperation({ summary: 'Obtener usuario por correo' })
  @ApiParam({
    name: 'email',
    description: 'Correo del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno',
  })
  findOne(@Param('email') email: string) {
    return this.usuariosService.findOne(email);
  }


  @Patch(':email')
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({
    name: 'email',
    description: 'Correo del usuario',
  })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuario no encontrado o datos inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al actualizar usuario',
  })
  update(@Param('email') email: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(email, updateUsuarioDto);
  }


  @Delete(':email')
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({
    name: 'email',
    description: 'Correo del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente',
    schema: {
      example: {
        message: 'Usuario con correo test@gmail.com eliminado correctamente',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al eliminar usuario',
  })
  remove(@Param('email') email: string) {
    return this.usuariosService.remove(email);
  }
}
