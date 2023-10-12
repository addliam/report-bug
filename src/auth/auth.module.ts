import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientesModule } from 'src/clientes/clientes.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './constants';
import { HashingService } from './util/hashing.service';

@Module({
  imports: [
    ClientesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HashingService],
})
export class AuthModule {}
