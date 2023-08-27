import {IBpmnActivity} from "../../-bpmn/bpmn-interface";

export class GetBalanceActivity implements IBpmnActivity {
	async run(params: any) {
		console.log(">>> run activity getBalance");
		if (params?.environment?.output)
			params.environment.output.transfer = false;

		if (params?.environment?.variables)
			return params.environment.variables.balance;

		return false;
	}
}
