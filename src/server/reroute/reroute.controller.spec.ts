import { Test, TestingModule } from '@nestjs/testing';
import { RerouteController } from './reroute.controller';

describe('RerouteController', () => {
  let controller: RerouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RerouteController],
    }).compile();

    controller = module.get<RerouteController>(RerouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
