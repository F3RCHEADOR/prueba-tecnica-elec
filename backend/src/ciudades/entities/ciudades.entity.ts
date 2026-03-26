import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ciudades')
export class Ciudad {

  @PrimaryGeneratedColumn('uuid')  //esto sera string para manejar uuid
  id: string;

  @Column()
  nombre: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Departamento, (departamento) => departamento.ciudades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento;

  @Column()
  departamento_id: string;

}
