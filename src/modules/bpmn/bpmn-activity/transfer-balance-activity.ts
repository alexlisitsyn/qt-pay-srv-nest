import { Injectable, Logger } from "@nestjs/common";
import { IBpmnActivity } from "../bpmn.interface";

@Injectable()
export class TransferBalanceActivity implements IBpmnActivity {
	private readonly logger = new Logger(TransferBalanceActivity.name);

	async run(params: any) {
		console.log("run activity transferBalance");
		// this.logger.log("run activity transferBalance");
		return true;
	}
}
