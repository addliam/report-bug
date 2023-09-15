// https://docs.nestjs.com/techniques/validation
// validacion de campos en dto
import { IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
