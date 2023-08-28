import { Injectable, Logger } from "@nestjs/common";
import { IBpmnActivity } from "../bpmn.interface";
import { PayService } from "../../pay-service/pay-service-interface";

@Injectable()
class GetBalanceActivity implements IBpmnActivity {
	private readonly logger = new Logger(GetBalanceActivity.name);

	constructor(
		private payService: PayService
	) {
	}


	async run(params: any) {
		console.log("run activity getBalance");
		// this.logger.log("run activity getBalance");

		// clear output values from previous start
		if (params?.environment?.output) {
			params.environment.output.transfer = false;
			params.environment.output.balance = null;
		}

		const {provider, balanceLimit} = params?.environment?.variables;
		if (provider != 'binance') {
			console.warn('GetBalanceActivity: unknown provider');
			return false;
		}

		if (!balanceLimit) {
			console.warn('GetBalanceActivity: incorrect balanceLimit settings');
			return false;
		}

		const balance = await this.payService.getBalance(provider);
		params.environment.output.balance = balance;
		return balance;
	}
}

export {
	GetBalanceActivity
};
