import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientesService } from 'src/clientes/clientes.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './entities/payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientesService: ClientesService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.clientesService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload: Payload = {
      sub: user.cliente_id,
      email: user.email,
      usuario: user.usuario,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
