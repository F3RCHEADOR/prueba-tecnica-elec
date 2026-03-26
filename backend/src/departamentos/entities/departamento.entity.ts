import { Ciudad } from "src/ciudades/entities/ciudades.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('departamentos')
export class Departamento {

  @PrimaryGeneratedColumn('uuid')  //esto sera string para manejar uuid
  id: string;

  @Column()
  nombre: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.departamento)
  ciudades: Ciudad[];

}
