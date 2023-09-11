import { Injectable, Logger } from "@nestjs/common";
import * as path from "path";
import { Engine } from "bpmn-engine";

import { getFileContent } from "../../common/file-helper";
import { IEngine } from "./bpmn.interface";
import { BpmnModel } from "./bpmn.model";
// import { cmpFirstBigger, runActivityById } from "./bpmn-activity";
import { BpmnActivityHelper } from "./bpmn-activity";
import { BpmnListenerHelper } from "./bpmn-listener";

@Injectable()
export class BpmnService {

	private readonly logger = new Logger(BpmnService.name);
	private readonly engines: Record<string, IEngine> = {};

	private readonly bpmnListenerHelper = new BpmnListenerHelper();

	constructor(
		private bpmnModel: BpmnModel
	) {
		this.init().then();
	}

	async initEnginesFromFiles () {
		const filePath = path.join(__dirname, "../../../bpmn-xml/account-balance.bpmn");
		const source = getFileContent(filePath);
		const engineName = "account-balance";
		this.engines[engineName] = {
			name: "account-balance",
			engine: this.getEngine({ name: engineName, source })
		};
	}

	async initEnginesFromDB () {
		const bpmns = await this.bpmnModel.getActiveBpmns();
		bpmns.forEach(bpmn => {
			this.engines[bpmn.name] = {
				name: "account-balance",
				engine: this.getEngine({ name: bpmn.name, source: bpmn.schema }),
				variables: bpmn.options?.variables,
				listeners: bpmn.options?.listeners
			};
		});
	}

	async init() {
		if (Object.entries(this.engines).length)
			return;

		// await this.initFromFiles();
		await this.initEnginesFromDB();
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

					activity.on("end", ({ environment, content }) => {
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


	cmpFirstBigger(first, second) {
		console.log('> cmpFirstBigger > first, second:', first, second);
		return first > second;
	}

	async runActivityById(scope, callback) {
		let result: any;

		try {
			const activityHelper = new BpmnActivityHelper();
			result = await activityHelper.run(scope.id, [scope]);
		} catch (err) {
			return callback(null, err);
		}

		return callback(null, result);
	}

	async execEngineByName(engineName: string, runtimeVariables?: any) {

		this.logger.log(`--- BpmnService execEngineByName START: ${engineName}, ${JSON.stringify(runtimeVariables)} `);

		if (!this.engines[engineName]) {
			console.error(`Unknown activity: ${engineName}`);
			return false;
		}

		const engine = this.engines[engineName];

		const listener = await this.bpmnListenerHelper.buildListeners(engine.listeners);

		// ToDo: add variables from DB settings
		const variables: any = {};

		const execOptions = {
			listener,
			variables: {
				...variables,
				...runtimeVariables
			},
			services: {
				runActivityById: this.runActivityById,
				cmpFirstBigger: this.cmpFirstBigger
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
