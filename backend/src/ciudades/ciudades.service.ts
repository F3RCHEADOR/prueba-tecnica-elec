import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCiudadeDto } from './dto/create-ciudade.dto';
import { UpdateCiudadeDto } from './dto/update-ciudade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudades.entity';
import { Repository } from 'typeorm';
import { DepartamentosService } from 'src/departamentos/departamentos.service';

@Injectable()
export class CiudadesService {

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    private readonly departamentoServicio: DepartamentosService
  ) { }

  async create(createCiudadeDto: CreateCiudadeDto): Promise<Ciudad> {
    try {

      await this.departamentoServicio.findOne(createCiudadeDto.departamento_id);

      const ciudad = this.ciudadRepository.create(createCiudadeDto);

      return await this.ciudadRepository.save(ciudad);

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo crear la ciudad');
    }
  }

  async findAll(): Promise<Ciudad[]> {
    try {

      return await this.ciudadRepository.find({ relations: ['departamento'] });

    } catch (error) {
      throw new InternalServerErrorException('No se pudo obtener las ciudades');
    }
  }

  async findOne(id: string): Promise<Ciudad> {
    try {

      const ciudad = await this.ciudadRepository.findOne({ where: { id }, relations: ['departamento'] });

      if (!ciudad) throw new BadRequestException('Ciudad no encontrada');

      return ciudad;

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo obtener la ciudad');
    }
  }

  async update(id: string, updateCiudadeDto: UpdateCiudadeDto): Promise<Ciudad> {
    try {

      const ciudad = await this.ciudadRepository.findOne({ where: { id } });

      if (!ciudad) throw new BadRequestException('Ciudad no encontrada');

      if (updateCiudadeDto.departamento_id) {
        await this.departamentoServicio.findOne(updateCiudadeDto.departamento_id);
      }

      Object.assign(ciudad, updateCiudadeDto);
      return await this.ciudadRepository.save(ciudad);

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo actualizar la ciudad');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {

      const ciudad = await this.ciudadRepository.findOne({ where: { id } });

      if (!ciudad) throw new BadRequestException('Ciudad no encontrada');

      await this.ciudadRepository.remove(ciudad);

      return { message: `La ciudad ${ciudad.nombre} ha sido eliminada` };

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo eliminar la ciudad');
    }
  }
}