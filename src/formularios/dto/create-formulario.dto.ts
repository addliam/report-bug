import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateFormularioDto {
  cliente_id: number;

  @IsNotEmpty()
  url_web: string;
}
