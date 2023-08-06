import { Injectable, Logger } from "@nestjs/common";
import {PayService} from './pay-service-interface';
import { IParams } from "./pay-service.controller";
import { BinancePayService } from "./binance/binance-pay-service";
import { HuobiPayService } from "./huobi/huobi-pay-service";

@Injectable()
export class PayServiceService {
	private readonly logger = new Logger(PayServiceService.name);
	private paySrv = new PayService();

	async initModules() {
		this.paySrv.use('binance', new BinancePayService())
		this.paySrv.use('huobi', new HuobiPayService())
	}

	async tmp1(params: IParams) {
		this.logger.log('tmp1', params);

		return this.paySrv.getBalance(params.name);
	}
}
