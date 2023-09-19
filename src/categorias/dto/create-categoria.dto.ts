import { IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  cliente_id: number;

  @IsNotEmpty()
  nombre: string;
}
