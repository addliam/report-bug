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

  async getNumResp(formId: number) {
    const v = await this.respuestaRepository.count({
      where: { formulario_id: formId },
    });
    return v;
  }

  async findByFormularioId(formularioId: number) {
    const result = await this.respuestaRepository
      .createQueryBuilder('respuestas')
      .leftJoinAndSelect('respuestas.categoria', 'categoria')
      .where('respuestas.formulario_id = :formulario_id', {
        formulario_id: formularioId,
      })
      .getMany();
    return result;
  }

  update(id: number, updateRespuestaDto: UpdateRespuestaDto) {
    return `This action updates a #${id} respuesta`;
  }

  remove(id: number) {
    return `This action removes a #${id} respuesta`;
  }
}
