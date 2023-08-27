import {IBpmnActivity} from "../bpmn.interface";

export class TransferBalanceActivity implements IBpmnActivity {
	async run(params: any) {
		console.log(">>> run activity transferBalance");
		return true;
	}
}
