import { FormularioCategoria } from 'src/formulariocategoria/entities/formulariocategoria.entity';
import { Formulario } from 'src/formularios/entities/formulario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => FormularioCategoria, (formCat) => formCat.categoria_id)
  formulario_categorias: FormularioCategoria[];
}
