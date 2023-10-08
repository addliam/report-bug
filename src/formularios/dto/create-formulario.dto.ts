import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateFormularioDto {
  cliente_id: number;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  url_web: string;
}
