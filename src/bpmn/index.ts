import { Injectable, Logger } from "@nestjs/common";
import { Engine, BpmnEngineExecuteOptions } from "bpmn-engine";

@Injectable()
export class BpmnService {

	private readonly logger = new Logger(BpmnService.name);
	private readonly engine;

	constructor() {
	}

	async getEngine(options: BpmnEngineExecuteOptions) {
		return new Engine(options);
	}
}

export default new BpmnService();
