import { Injectable } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { CreateFormularioCategoriaDto } from '../formulariocategoria/dto/create-formulario-categoria.dto';
// relacionado a typeorm
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entidad
import { Formulario } from './entities/formulario.entity';
import { FormulariocategoriaService } from '../formulariocategoria/formulariocategoria.service';
// externas
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormulariosService {
  constructor(
    @InjectRepository(Formulario)
    private formularioRepository: Repository<Formulario>,
  ) {}

  async create(createFormularioDto: CreateFormularioDto) {
    // TODO: validacion de url_web sea una url
    // generacion automatica de slug
    const autoGeneratedSlug = uuidv4();
    const formulario = this.formularioRepository.create({
      slug: autoGeneratedSlug,
      cliente_id: createFormularioDto.cliente_id,
      url_web: createFormularioDto.url_web,
    });
    return await this.formularioRepository.save(formulario);
  }

  findAll() {
    return this.formularioRepository.find();
  }

  async checkIsOwner(clienteId: number, formularioId: number) {
    return (
      (await this.formularioRepository.findOne({
        where: {
          formulario_id: formularioId,
          cliente_id: clienteId,
        },
      })) !== null
    );
  }

  async findByClienteId(clienteId: number) {
    return await this.formularioRepository.find({
      where: {
        cliente_id: clienteId,
      },
    });
  }

  async findOne(id: number) {
    return await this.formularioRepository.findOne({
      where: { formulario_id: id },
    });
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  remove(id: number) {
    return `This action removes a #${id} formulario`;
  }
}
