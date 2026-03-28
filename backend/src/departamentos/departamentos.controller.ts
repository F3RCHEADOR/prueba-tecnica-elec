import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Departamento } from './entities/departamento.entity';


@ApiTags('Departamentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {

  }

  @Post()
  @ApiOperation({ summary: 'Crear un departamento' })
  @ApiBody({ type: CreateDepartamentoDto })
  @ApiResponse({
    status: 201,
    description: 'Departamento creado correctamente',
    type: Departamento,
  })
  @ApiResponse({
    status: 400,
    description: 'Nombre duplicado o datos inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno al crear el departamento',
  })
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los departamentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de departamentos con sus ciudades',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener los departamentos',
  })
  findAll() {
    return this.departamentosService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Obtener un departamento por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del departamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Departamento encontrado',
    type: Departamento,
  })
  @ApiResponse({
    status: 400,
    description: 'Departamento no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno',
  })
  findOne(@Param('id') id: string) {
    return this.departamentosService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un departamento' })
  @ApiParam({
    name: 'id',
    description: 'ID del departamento',
  })
  @ApiBody({ type: UpdateDepartamentoDto })
  @ApiResponse({
    status: 200,
    description: 'Departamento actualizado correctamente',
    type: Departamento,
  })
  @ApiResponse({
    status: 400,
    description: 'Departamento no encontrado o datos inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al actualizar el departamento',
  })
  update(@Param('id') id: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentosService.update(id, updateDepartamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un departamento' })
  @ApiParam({
    name: 'id',
    description: 'ID del departamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Departamento eliminado correctamente',
    schema: {
      example: {
        message: 'Departamento Santander eliminado correctamente',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Departamento no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al eliminar el departamento',
  })
  remove(@Param('id') id: string) {
    return this.departamentosService.remove(id);
  }
}
