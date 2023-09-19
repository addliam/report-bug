import { Module } from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { FormulariosController } from './formularios.controller';
// para typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formulario } from './entities/formulario.entity';
// importar el modulo, para poder usar el servicio
// https://stackoverflow.com/questions/51819504/inject-nestjs-service-from-another-module
import { FormulariocategoriaModule } from 'src/formulariocategoria/formulariocategoria.module';
import { RespuestasModule } from 'src/respuestas/respuestas.module';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Formulario]),
    FormulariocategoriaModule,
    RespuestasModule,
    CategoriasModule,
  ],
  controllers: [FormulariosController],
  providers: [FormulariosService],
})
export class FormulariosModule {}
