import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { CreateFormularioCategoriaDto } from '../formulariocategoria/dto/create-formulario-categoria.dto';
// servicio form-categ
import { FormulariocategoriaService } from 'src/formulariocategoria/formulariocategoria.service';

@Controller('formularios')
export class FormulariosController {
  constructor(
    private readonly formulariosService: FormulariosService,
    private readonly formularioCategoriaService: FormulariocategoriaService,
  ) {}

  @Post()
  create(@Body() createFormularioDto: CreateFormularioDto) {
    return this.formulariosService.create(createFormularioDto);
  }

  @Get()
  findAll() {
    // TODO: remover busqueda de todos los formularios
    return this.formulariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formulariosService.findOne(+id);
  }

  /**
   * @description POST web.com/formularios/123/categorias
    Cuerpo de la solicitud:
    {
      "categorias": [1, 2, 3]
    }
   * @param id - formulario_id 
   */
  @Post(':id/categorias')
  asignarCategorias(
    @Param('id') id: string,
    @Body() createFormularioCategoriaDto: CreateFormularioCategoriaDto,
  ) {
    return this.formularioCategoriaService.asignarCategorias(
      +id,
      createFormularioCategoriaDto,
    );
  }

  @Get(':id/categorias')
  obtenerCategorias(@Param('id') id: string) {
    return this.formularioCategoriaService.obtenerCategorias(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return this.formulariosService.update(+id, updateFormularioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formulariosService.remove(+id);
  }
}
