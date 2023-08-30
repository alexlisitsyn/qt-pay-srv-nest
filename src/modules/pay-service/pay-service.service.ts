import { Injectable, Logger } from "@nestjs/common";
import { payServiceInterface } from "./pay-service-strategy";
import { BinancePayService } from "./binance/binance-pay-service";
import { HuobiPayService } from "./huobi/huobi-pay-service";

@Injectable()
export class PayServiceService {
	private readonly logger = new Logger(PayServiceService.name);
	private paySrv = payServiceInterface;

	async initModules() {
		this.logger.log(">>> PayServiceService > initModules");
		// ToDo: возможно динамическое подключение, тогда не нужно дополнительных проверок возможности оплаты
		//  т.е. подключаем модуль, когда есть возможность проведения платежей
		this.paySrv.use("binance", new BinancePayService());
		this.paySrv.use("huobi", new HuobiPayService());
	}

	async getBalance(name: string) {
		this.logger.log("getBalance > name:", name);
		return payServiceInterface.getBalance(name);
	}
}

export const payServiceService = new PayServiceService();
