import { IPayService } from "../pay-service-interface";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class HuobiPayService implements IPayService {

	private readonly logger = new Logger(HuobiPayService.name);

	getBalance(...args: any): null | any {
		// this.logger.log('getBalance', args);
		return 456;
	}
}
