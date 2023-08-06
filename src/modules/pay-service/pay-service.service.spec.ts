import { Test, TestingModule } from '@nestjs/testing';
import { PayServiceService } from './pay-service.service';

describe('PayServiceService', () => {
  let service: PayServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayServiceService],
    }).compile();

    service = module.get<PayServiceService>(PayServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
