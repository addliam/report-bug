import { Test, TestingModule } from '@nestjs/testing';
import { FormulariocategoriaService } from './formulariocategoria.service';

describe('FormulariocategoriaService', () => {
  let service: FormulariocategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormulariocategoriaService],
    }).compile();

    service = module.get<FormulariocategoriaService>(FormulariocategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
