import { Cliente } from 'src/clientes/entities/cliente.entity';
import { FormularioCategoria } from 'src/formulariocategoria/entities/formulariocategoria.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'formularios' })
export class Formulario {
  @PrimaryGeneratedColumn()
  formulario_id: number;

  @Column()
  cliente_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  url_web: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.formularios)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => FormularioCategoria, (formCat) => formCat.formulario_id)
  formulario_categorias: FormularioCategoria[];
}
