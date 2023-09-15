import { Injectable } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
// relacionado a typeorm
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entidad
import { Formulario } from './entities/formulario.entity';

@Injectable()
export class FormulariosService {
  constructor(
    @InjectRepository(Formulario)
    private formularioRepository: Repository<Formulario>,
  ) {}

  create(createFormularioDto: CreateFormularioDto) {
    return 'This action adds a new formulario';
  }

  findAll() {
    return this.formularioRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} formulario`;
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  remove(id: number) {
    return `This action removes a #${id} formulario`;
  }
}
