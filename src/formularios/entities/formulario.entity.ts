import { Cliente } from 'src/clientes/entities/cliente.entity';
import { FormularioCategoria } from 'src/formulariocategoria/entities/formulariocategoria.entity';
import { Respuesta } from 'src/respuestas/entities/respuesta.entity';
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

  @Column({
    type: 'varchar',
    length: 255,
  })
  nombre: string;

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
    unique: false,
    // false porque el mismo cliente puede querer evaluar distintos aspectos en distintos formularios misma paginas
  })
  url_web: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.formularios)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => FormularioCategoria, (formCat) => formCat.formulario_id)
  formulario_categorias: FormularioCategoria[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.formulario_id)
  respuestas: Respuesta[];
}
