import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Formulario } from 'src/formularios/entities/formulario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'respuestas' })
export class Respuesta {
  @PrimaryGeneratedColumn()
  respuesta_id: number;

  @Column()
  formulario_id: number;

  @Column()
  categoria_id: number;

  @Column({
    type: 'varchar',
    length: 4000,
  })
  contenido: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  usuario_email: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Formulario, (form) => form.formulario_id)
  @JoinColumn({ name: 'formulario_id' })
  formulario: Formulario;

  @ManyToOne(() => Categoria, (categoria) => categoria.categoria_id)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
