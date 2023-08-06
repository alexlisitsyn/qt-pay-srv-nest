import { Module } from '@nestjs/common';
import { PayServiceController } from './pay-service.controller';
import { PayServiceService } from './pay-service.service';

@Module({
  controllers: [PayServiceController],
  providers: [PayServiceService],
})
export class PayServiceModule {
  constructor(
    private payServiceService: PayServiceService
  ) {
    payServiceService.initModules().then();
  }
}
