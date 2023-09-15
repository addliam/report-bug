import { ArrayNotEmpty } from 'class-validator';
export class CreateFormularioCategoriaDto {
  @ArrayNotEmpty()
  categorias: number[];
}
