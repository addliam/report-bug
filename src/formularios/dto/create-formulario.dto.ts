import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateFormularioDto {
  @IsNumber()
  cliente_id: number;

  @IsNotEmpty()
  url_web: string;
}
