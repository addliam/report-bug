import { Module } from '@nestjs/common';
import { FormulariocategoriaService } from './formulariocategoria.service';
// para typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioCategoria } from './entities/formulariocategoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormularioCategoria])],
  providers: [FormulariocategoriaService],
  // exportar el servicio, en el modulo que lo provee
  exports: [FormulariocategoriaService],
})
export class FormulariocategoriaModule {}
