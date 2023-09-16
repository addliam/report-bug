import { Injectable } from '@nestjs/common';
// relacionado a typeorm
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entidad
import { FormularioCategoria } from './entities/formulariocategoria.entity';
// dto
import { CreateFormularioCategoriaDto } from 'src/formulariocategoria/dto/create-formulario-categoria.dto';

@Injectable()
export class FormulariocategoriaService {
  constructor(
    @InjectRepository(FormularioCategoria)
    private formularioCategoriaRepository: Repository<FormularioCategoria>,
  ) {}

  // Obtener categorias asignadas a cierto formulario usando formularioId
  async obtenerCategorias(
    formularioId: number,
    ){
      return await this.formularioCategoriaRepository.find({
        where: {
          formulario_id: formularioId
        }
      })
    }

  async asignarCategorias(
    formularioId: number,
    createFormularioCategoriaDto: CreateFormularioCategoriaDto,
  ) {
    // TODO: validar datos categorias array numeros este en ddbb
    try {
      // crear una entrada en tabla "formulario_categorias" por cada categoria pasada
      const arrayCreatedFormCat = await Promise.all(
        createFormularioCategoriaDto.categorias.map(async (categoriaId) => {
          let formCat = this.formularioCategoriaRepository.create({
            formulario_id: formularioId,
            categoria_id: categoriaId,
          });
          return await this.formularioCategoriaRepository.save(formCat);
        }),
      );
      return arrayCreatedFormCat;
    } catch (error) {
      return 'Error asignando categorias';
    }
  }
}
