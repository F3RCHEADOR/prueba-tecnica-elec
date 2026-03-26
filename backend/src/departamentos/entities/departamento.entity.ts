import { Ciudad } from "src/ciudades/entities/ciudades.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('departamentos')
export class Departamento {

  @PrimaryGeneratedColumn('uuid')  //esto sera string para manejar uuid
  id: string;

  @Column({ unique: true }) //No deberia existir dos departamentos llamados iguales en el mismo pais
  nombre: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.departamento)
  ciudades: Ciudad[];

}
