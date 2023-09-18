import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// typeormmodule for ddbb configuration
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { FormulariosModule } from './formularios/formularios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { FormulariocategoriaModule } from './formulariocategoria/formulariocategoria.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ConfigModule para poder configurar variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'reportbug',
      entities: [__dirname + '/**/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    ClientesModule,
    FormulariosModule,
    CategoriasModule,
    FormulariocategoriaModule,
    RespuestasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // DataSource and EntityManager objects will be available to inject across the entire project (without needing to import any modules)
  constructor(private dataSource: DataSource) {}
}
