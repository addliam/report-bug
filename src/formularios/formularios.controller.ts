import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { CreateFormularioCategoriaDto } from '../formulariocategoria/dto/create-formulario-categoria.dto';
// servicio form-categ
import { FormulariocategoriaService } from 'src/formulariocategoria/formulariocategoria.service';
import { RespuestasService } from 'src/respuestas/respuestas.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoriasService } from 'src/categorias/categorias.service';

@Controller('formularios')
export class FormulariosController {
  constructor(
    private readonly formulariosService: FormulariosService,
    private readonly respuestaService: RespuestasService,
    private readonly formularioCategoriaService: FormulariocategoriaService,
    private readonly categoriaService: CategoriasService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createFormularioDto: CreateFormularioDto, @Request() req) {
    createFormularioDto.cliente_id = req.user.sub;
    return this.formulariosService.create(createFormularioDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.formulariosService.findByClienteId(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    let check = await this.formulariosService.checkIsOwner(req.user.sub, +id);
    if (check) {
      return this.formulariosService.findOne(+id);
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * @description POST web.com/formularios/123/categorias
    Cuerpo de la solicitud:
    {
      "categorias": [1, 2, 3]
    }
   * @param id - formulario_id 
   */
  @UseGuards(AuthGuard)
  @Post(':id/categorias')
  async asignarCategorias(
    @Param('id') id: string,
    @Body() createFormularioCategoriaDto: CreateFormularioCategoriaDto,
    @Request() req,
  ) {
    // VALIDACION: categorias enviadas son de propiedad del usuario
    const categorias = createFormularioCategoriaDto.categorias;
    let ownerTodasCategorias: boolean = (
      await Promise.all(
        categorias.map((categ) =>
          this.categoriaService.checkIsOwner(req.user.sub, categ),
        ),
      )
    ).every((v) => v === true);
    if (!ownerTodasCategorias) {
      throw new UnauthorizedException();
    } else {
      return this.formularioCategoriaService.asignarCategorias(
        +id,
        createFormularioCategoriaDto,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id/categorias')
  async obtenerCategorias(@Param('id') id: string, @Request() req) {
    let check = await this.formulariosService.checkIsOwner(req.user.sub, +id);
    if (check) {
      return this.formularioCategoriaService.obtenerCategorias(+id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id/respuestas')
  async obtenerRespuestasByFormularioId(
    @Param('id') id: string,
    @Request() req,
  ) {
    let check = await this.formulariosService.checkIsOwner(req.user.sub, +id);
    if (check) {
      return this.respuestaService.findByFormularioId(+id);
    } else {
      throw new UnauthorizedException();
    }
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
