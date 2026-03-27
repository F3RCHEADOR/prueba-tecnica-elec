import { Module } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudades.entity';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad]), DepartamentosModule],
  controllers: [CiudadesController],
  providers: [CiudadesService],
})
export class CiudadesModule { }
