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

@Entity({ name: 'formulario_categorias' })
export class FormularioCategoria {
  @PrimaryGeneratedColumn()
  formulario_categoria_id: number;

  @Column()
  formulario_id: number;

  @Column()
  categoria_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // foreign key formulario_id
  @ManyToOne(() => Formulario, (form) => form.formulario_id)
  @JoinColumn({ name: 'formulario_id' })
  formulario: Formulario;

  // foreign key categoria_id
  @ManyToOne(() => Categoria, (categoria) => categoria.categoria_id)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
