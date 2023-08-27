import { Injectable, Logger } from "@nestjs/common";
import { IBpmnActivity } from "../bpmn.interface";

@Injectable()
class GetBalanceActivity implements IBpmnActivity {
	private readonly logger = new Logger(GetBalanceActivity.name);

	async run(params: any) {
		console.log("run activity getBalance");
		// this.logger.log("run activity getBalance");

		if (params?.environment?.output)
			params.environment.output.transfer = false;

		if (params?.environment?.variables)
			return params.environment.variables.balance;

		return false;
	}
}

export {
	GetBalanceActivity
};
