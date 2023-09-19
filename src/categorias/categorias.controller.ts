import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto, @Request() req) {
    createCategoriaDto.cliente_id = req.user.sub;
    return this.categoriasService.create(createCategoriaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.categoriasService.findByClienteId(req.user.sub);
  }

  @Get('/eliminados')
  findEliminados() {
    return this.categoriasService.findEliminados();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    if (await this.categoriasService.checkIsOwner(req.user.sub, +id)) {
      return this.categoriasService.findOne(+id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
    @Request() req,
  ) {
    if (await this.categoriasService.checkIsOwner(req.user.sub, +id)) {
      updateCategoriaDto.cliente_id = req.user.sub;
      return this.categoriasService.update(+id, updateCategoriaDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (await this.categoriasService.checkIsOwner(req.user.sub, +id)) {
      return this.categoriasService.remove(+id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
