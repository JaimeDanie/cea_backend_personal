import { Test, TestingModule } from '@nestjs/testing';
import { TubularService } from './tubular.service';

describe('TubularService', () => {
  let service: TubularService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TubularService],
    }).compile();

    service = module.get<TubularService>(TubularService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
