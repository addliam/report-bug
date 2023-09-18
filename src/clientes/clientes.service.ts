import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
// relacionado a typeorm
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entidad
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  // inyectar repositorio orm con parametro entidad
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    // TODO: hash password using bcrypt
    const cliente = this.clienteRepository.create({
      usuario: createClienteDto.usuario,
      email: createClienteDto.email,
      password: createClienteDto.password,
    });
    return await this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    return await this.clienteRepository.findOne({ where: { cliente_id: id } });
  }

  async findOneByEmail(email: string) {
    return await this.clienteRepository.findOne({
      where: { email: email },
    });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
