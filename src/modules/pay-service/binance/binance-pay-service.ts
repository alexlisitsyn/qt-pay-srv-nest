import { Injectable, Logger } from "@nestjs/common";
import { IPayService } from "../pay-service.interface";
import { binanceService } from "./binance-service";

@Injectable()
export class BinancePayService implements IPayService {

	private readonly logger = new Logger(BinancePayService.name);

	constructor() {
	}

	async getBalance(params: any): Promise<null | any> {
		this.logger.log('> BinancePayService > getBalance > params:');

		const res = await binanceService.getSubAccountSpotSummary();
		this.logger.log('> BinancePayService > getSubAccountSpotSummary > res:', res);

		return 4567;
	}
}

export const binancePayService = new BinancePayService();
