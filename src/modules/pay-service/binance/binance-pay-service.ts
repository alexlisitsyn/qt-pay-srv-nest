import { IPayService } from "../pay-service-interface";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class BinancePayService implements IPayService {

	private readonly logger = new Logger(BinancePayService.name);

	getBalance(...args: any): null | any {
		// this.logger.log('getBalance', JSON.stringify(args));
		return 123;
	}
}
