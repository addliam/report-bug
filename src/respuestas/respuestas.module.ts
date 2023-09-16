import { Module } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { RespuestasController } from './respuestas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './entities/respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta])],
  controllers: [RespuestasController],
  providers: [RespuestasService],
})
export class RespuestasModule {}
