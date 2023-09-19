import { Cliente } from 'src/clientes/entities/cliente.entity';
import { FormularioCategoria } from 'src/formulariocategoria/entities/formulariocategoria.entity';
import { Formulario } from 'src/formularios/entities/formulario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
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

  @Column()
  cliente_id: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => FormularioCategoria, (formCat) => formCat.categoria_id)
  formulario_categorias: FormularioCategoria[];

  @ManyToOne(() => Cliente, (cliente) => cliente.categorias)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;
}
