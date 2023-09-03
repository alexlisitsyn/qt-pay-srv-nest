import { IPayService } from "../pay-service.interface";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class HuobiPayService implements IPayService {

	private readonly logger = new Logger(HuobiPayService.name);

	async getBalance(params: any): Promise<null | any> {
		this.logger.log('> HuobiPayService > getBalance > params:');
		return 1256;
	}
}

export const huobiPayService = new HuobiPayService();
