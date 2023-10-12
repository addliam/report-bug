import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
