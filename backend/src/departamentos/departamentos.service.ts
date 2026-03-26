import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) { }

  async create(createDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
    try {
      const duplicado = await this.departamentoRepository.findOneBy({ nombre: createDepartamentoDto.nombre });

      if (duplicado) throw new BadRequestException('Nombre del departamento duplicado');

      const departamento = this.departamentoRepository.create(createDepartamentoDto);

      return this.departamentoRepository.save(departamento);

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo crear el departamento');
    }
  }

  async findAll(): Promise<Departamento[]> {
    try {

      return await this.departamentoRepository.find({ relations: ['ciudades'] });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo obtener los departamentos');
    }
  }

  async findOne(id: string): Promise<Departamento> {
    try {

      const departamento = await this.departamentoRepository.findOne({ where: { id }, relations: ['ciudades'] });

      if (!departamento) throw new BadRequestException('Departamento no encontrado');

      return departamento;

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo obtener el departamento');
    }
  }

  async update(id: string, updateDepartamentoDto: UpdateDepartamentoDto): Promise<Departamento> {
    try {

      const departamento = await this.departamentoRepository.findOne({ where: { id } });

      if (!departamento) throw new BadRequestException('Departamento no encontrado');

      Object.assign(departamento, updateDepartamentoDto);

      return await this.departamentoRepository.save(departamento);

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo actualizar el departamento');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {

      const departamento = await this.departamentoRepository.findOne({ where: { id } });

      if (!departamento) throw new BadRequestException('Departamento no encontrado');

      await this.departamentoRepository.remove(departamento);

      return { message: `Departamento ${departamento.nombre} eliminado correctamente` };

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo eliminar el departamento');
    }
  }
}