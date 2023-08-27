import * as path from "path";
import {Injectable, Logger} from "@nestjs/common";
import {Engine} from "bpmn-engine";
import {EventEmitter} from "events";
import {getFileContent} from "../common/file-helper";
import {checkBalance, runActivityById} from "./bpmn-activity";

export interface IEngine {
	name: string;
	engine: any;
}

@Injectable()
export class BpmnService {

	private readonly logger = new Logger(BpmnService.name);
	private readonly engines: Record<string, IEngine> = {};

	constructor() {
		this.init().then();
	}

	async init() {
		if (Object.entries(this.engines).length)
			return;

		// ToDo: move to DB
		const filePath = path.join(__dirname, "../../bpmn-xml/account-balance.bpmn");
		const source = getFileContent(filePath);
		const engineName = "account-balance";
		this.engines[engineName] = {
			name: "account-balance",
			engine: this.getEngine({name: engineName, source})
		};
	}

	// async getEngine(options: BpmnEngineExecuteOptions) {
	getEngine(options: any) {
		const updOptions = {
			...options,
			moddleOptions: {
				...options.moddleOptions,
				camunda: require("camunda-bpmn-moddle/resources/camunda")
			},
			extensions: {
				...options.extensions,
				saveToResultVariable(activity) {
					if (!activity.behaviour.resultVariable)
						return;

					activity.on("end", ({environment, content}) => {
						// console.log('!!! activity on end:', activity.id);
						environment.output[activity.behaviour.resultVariable] = content.output[0];
						// environment.variables[activity.behaviour.resultVariable] = content.output[0];
					});
				}
			}
		};

		return new Engine(updOptions);
	}

	async execEngine(engine: IEngine, execOptions) {
		return engine.engine.execute(execOptions, (err, execution) => {
			if (err)
				throw err;

			// console.log("***", execution.name, execution.environment.output);
			// console.log(">>> Balance:", execution.environment.output.balance);
		});
	}

	async execEngineByName(engineName: string, runtimeVariables: any) {

		this.logger.log(`--- BpmnService execEngineByName START: ${engineName}, ${JSON.stringify(runtimeVariables)} `);

		// ToDo: get engine settings from db

		if (!this.engines[engineName]) {
			console.error(`Unknown activity: ${engineName}`);
			return false;
		}

		const engine = this.engines[engineName];

		const listener = new EventEmitter();
		// ToDo: add listener from DB settings

		const variables: any = {};
		// ToDo: add variables from DB settings

		const execOptions = {
			listener,
			variables: {
				...variables,
				...runtimeVariables
			},
			services: {
				runActivityById,
				checkBalance
			}
		};

		const execRes = await this.execEngine(engine, execOptions);
		this.logger.log(`--- BpmnService execEngineByName END: ${JSON.stringify(execRes?.environment?.output)}`);

		return {
			variables: {
				...variables,
				...runtimeVariables
			},
			output: execRes?.environment?.output
		};
	}


}

export default new BpmnService();
