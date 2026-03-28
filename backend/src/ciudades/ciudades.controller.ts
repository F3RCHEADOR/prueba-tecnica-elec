import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CiudadesService } from './ciudades.service';
import { CreateCiudadeDto } from './dto/create-ciudade.dto';
import { UpdateCiudadeDto } from './dto/update-ciudade.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Ciudad } from './entities/ciudades.entity';

@ApiTags('Ciudades')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una ciudad' })
  @ApiBody({ type: CreateCiudadeDto })
  @ApiResponse({
    status: 201,
    description: 'Ciudad creada correctamente',
    type: Ciudad,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o departamento no existe',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno al crear la ciudad',
  })
  create(@Body() createCiudadeDto: CreateCiudadeDto) {
    return this.ciudadesService.create(createCiudadeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ciudades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ciudades',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener ciudades',
  })
  findAll() {
    return this.ciudadesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ciudad por ID' })
  @ApiParam({ name: 'id', description: 'ID de la ciudad' })
  @ApiResponse({
    status: 200,
    description: 'Ciudad encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Ciudad no encontrada',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno',
  })
  findOne(@Param('id') id: string) {
    return this.ciudadesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ciudad' })
  @ApiParam({ name: 'id', description: 'ID de la ciudad' })
  @ApiBody({ type: UpdateCiudadeDto })
  @ApiResponse({
    status: 200,
    description: 'Ciudad actualizada correctamente',
    type: UpdateCiudadeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Ciudad no encontrada o datos inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al actualizar',
  })
  update(
    @Param('id') id: string,
    @Body() updateCiudadeDto: UpdateCiudadeDto,
  ) {
    return this.ciudadesService.update(id, updateCiudadeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ciudad' })
  @ApiParam({ name: 'id', description: 'ID de la ciudad' })
  @ApiResponse({
    status: 200,
    description: 'Ciudad eliminada',
    schema: {
      example: {
        message: 'La ciudad Piedecuesta ha sido eliminada',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Ciudad no encontrada',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al eliminar',
  })
  remove(@Param('id') id: string) {
    return this.ciudadesService.remove(id);
  }
}