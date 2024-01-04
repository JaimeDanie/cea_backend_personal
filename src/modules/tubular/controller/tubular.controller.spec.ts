import { Test, TestingModule } from '@nestjs/testing';
import { TubularController } from './tubular.controller';

describe('TubularController', () => {
  let controller: TubularController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TubularController],
    }).compile();

    controller = module.get<TubularController>(TubularController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
