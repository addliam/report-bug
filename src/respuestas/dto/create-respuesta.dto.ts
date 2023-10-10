import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateRespuestaDto {
  @IsNumber()
  formulario_id: number;

  @IsNumber()
  categoria_id: number;

  @IsNotEmpty()
  contenido: string;

  @IsNotEmpty()
  google_token: string;
}
