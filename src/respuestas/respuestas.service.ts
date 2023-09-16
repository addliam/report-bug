import { Injectable } from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
  ) {}

  async create(createRespuestaDto: CreateRespuestaDto) {
    const respuesta = this.respuestaRepository.create(createRespuestaDto);
    return await this.respuestaRepository.save(respuesta);
  }

  async findAll() {
    return await this.respuestaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} respuesta`;
  }

  async findByFormularioId(formularioId: number) {
    return await this.respuestaRepository.find({
      where: {
        formulario_id: formularioId,
      },
    });
  }

  update(id: number, updateRespuestaDto: UpdateRespuestaDto) {
    return `This action updates a #${id} respuesta`;
  }

  remove(id: number) {
    return `This action removes a #${id} respuesta`;
  }
}
