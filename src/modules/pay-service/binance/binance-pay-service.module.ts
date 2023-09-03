import { Module } from '@nestjs/common';
import { BinancePayService } from './binance-pay-service';

@Module({
  providers: [BinancePayService],
})
export class BinancePayServiceModule {
  constructor() {
  }
}
