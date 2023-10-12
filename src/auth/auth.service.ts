import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientesService } from 'src/clientes/clientes.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './entities/payload.entity';
import { HashingService } from './util/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private clientesService: ClientesService,
    private jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async register(
    usuario: string,
    email: string,
    plainPassword: string,
  ): Promise<any> {
    const user = await this.clientesService.findOneByEmail(email);
    if (user) {
      // if already exist throw error
      throw new UnauthorizedException();
    }
    const hashedPassword = await this.hashingService.hash(plainPassword);
    return await this.clientesService.create({
      usuario: usuario,
      email: email,
      password: hashedPassword,
    });
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.clientesService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const match = await this.hashingService.compare(pass, user.password);
    if (!match) {
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
