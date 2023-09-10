import { Module } from '@nestjs/common';
import { HuobiPayService } from './huobi-pay-service';
import { HuobiService } from "./huobi-service";

@Module({
  providers: [HuobiPayService, HuobiService]
})
export class HuobiPayServiceModule {
  constructor() {
  }
}
