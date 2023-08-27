import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class BpmnService {

	private readonly logger = new Logger(BpmnService.name);

	async execEngineByName(engineName: string, runtimeVariables: any) {
		this.logger.log('execEngineByName');
	}
}
