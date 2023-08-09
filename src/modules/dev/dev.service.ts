import { Injectable, Logger } from "@nestjs/common";
import { engine } from "../../bpmn/example";

@Injectable()
export class DevService {
	private readonly logger = new Logger(DevService.name);

	async tmp1(params: any){

		const execRes = await engine.execute((err, execution) => {
			if (err)
				this.logger.error('Execution completed with error', err);
			else
				this.logger.log('Execution completed with id', execution.environment.variables.id);
		});

		this.logger.log('tmp1 END');

		return execRes.options.variables;
	}
}
