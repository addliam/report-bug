import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll() {
    return await this.categoriaRepository.find({
      where: {
        activo: true,
      },
    });
  }

  async findEliminados() {
    return await this.categoriaRepository.find({
      where: {
        activo: false,
      },
    });
  }

  async findOne(categoriaId: number) {
    return await this.categoriaRepository.find({
      where: {
        categoria_id: categoriaId,
      },
    });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.categoriaRepository.update(id, updateCategoriaDto);
    return await this.categoriaRepository.find({
      where: {
        categoria_id: id,
      },
    });
  }

  async remove(id: number) {
    // TODO: gestionar cuando el id sea incorrecto
    const categoriaFound = await this.categoriaRepository.findOneBy({
      categoria_id: id,
    });
    // actualizar manualmente sin usar repo.update()
    categoriaFound.activo = false;
    // TODO: quiza la respuesta no deba incluir campo "activo"
    return await this.categoriaRepository.save(categoriaFound);
  }
}
