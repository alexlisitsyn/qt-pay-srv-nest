import { IPayService } from "../pay-service.interface";
import { Injectable, Logger } from "@nestjs/common";
import { HuobiService } from "./huobi-service";

@Injectable()
export class HuobiPayService implements IPayService {

	private readonly logger = new Logger(HuobiPayService.name);
	private readonly huobiService = new HuobiService();

	constructor() {

	}

	async getBalance(params: any): Promise<null | any> {
		try {
			this.logger.log('> HuobiPayService > getBalance > params:');

			const balanceRes = await this.huobiService.getAccountBalancePositive('58574798');
			// console.log('>>>> balanceRes', balanceRes);

			const res = balanceRes[0]?.balance;
			return Number(res);
		} catch (e) {
			this.logger.error(e);
		}

		// return 1256;
		return null;
	}
}

export const huobiPayService = new HuobiPayService();
