import { Test, TestingModule } from '@nestjs/testing';
import { PayServiceController } from './pay-service.controller';

describe('PayServiceController', () => {
  let controller: PayServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayServiceController],
    }).compile();

    controller = module.get<PayServiceController>(PayServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
