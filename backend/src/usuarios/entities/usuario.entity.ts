import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) //El correo tambien deberia ser unico...
  correo: string

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

}
