import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const duplicatedEmail = await this.usuarioRepository.findOneBy({ correo: createUsuarioDto.correo });
      if (duplicatedEmail) throw new BadRequestException('Error, correo duplicado');

      const encryptedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

      const usuario = this.usuarioRepository.create({
        correo: createUsuarioDto.correo,
        password: encryptedPassword,
      });

      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }

  async findAll(): Promise<Usuario[]> {
    try {
      return await this.usuarioRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo obtener los usuarios');
    }
  }

  async findOne(email: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ correo: email });

      if (!usuario) throw new BadRequestException('Uusuario no encontrado');

      return usuario;

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo obtener el usuario');
    }
  }

  async update(email: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { correo: email } });
      if (!usuario) throw new BadRequestException('Usuario no encontrado');


      if (updateUsuarioDto.password) {
        updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, 10);
      }

      Object.assign(usuario, updateUsuarioDto);

      return await this.usuarioRepository.save(usuario);

    } catch (error) {

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo actualizar el usuario');
    }
  }

  async remove(email: string): Promise<{ message: string }> {
    try {

      const usuario = await this.usuarioRepository.findOneBy({ correo: email });
      if (!usuario) throw new BadRequestException('Usuario no encontrado');

      await this.usuarioRepository.remove(usuario);

      return { message: `Usuario con correo ${email} eliminado correctamente` };

    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('No se pudo eliminar el usuario');
    }
  }
}