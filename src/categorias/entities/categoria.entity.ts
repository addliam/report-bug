import { Formulario } from 'src/formularios/entities/formulario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  categoria_id: number;

  @Column({
    type: 'varchar',
    length: 128,
    unique: true,
  })
  nombre: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // @ManyToOne(() => Formulario, (form) => form.formulario_id)
  // @JoinColumn({ name: 'formulario_id' })
  // cliente: Cliente;
}
