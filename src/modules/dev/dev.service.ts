import { Injectable, Logger } from "@nestjs/common";
import { engine } from "../../bpmn/example2";
import { EventEmitter } from "events";

@Injectable()
export class DevService {
	private readonly logger = new Logger(DevService.name);

	async tmp1(params: any) {

		const execRes = await engine.execute((err, execution) => {
			if (err)
				this.logger.error("Execution completed with error", err);
			else
				this.logger.log("Execution completed with id", execution.environment.variables.id);
		});

		this.logger.log("tmp1 END");

		return execRes.options.variables;
	}

	async tmp2(params: any) {

		const listener = new EventEmitter();
		listener.on("activity.end", (elementApi) => {
			if (elementApi.id === "end2")
				throw new Error(`<${elementApi.id}> should not have been taken`);
		});

		const execRes = await engine.execute({
			listener,
			services: {
				isBelow: (input, test) => {
					return input < test;
				}
			},
			variables: {
				input: 1  // 2
			}
		});

		engine.once("end", () => {
			this.logger.log("WOHO!");
		});

		this.logger.log("tmp2 END");

		return execRes.options.variables;
	}

}
