import { Injectable, Logger } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { IBpmn } from "./bpmn-interface";

@Injectable()
export class BpmnModel {

	private readonly logger = new Logger(BpmnModel.name);

	constructor(
		private dbService: DbService
	) {
	}

	async getActiveBpmns(): Promise<IBpmn[]> {
		return await this.dbService.query('select * from "bpmn" where active = true') as IBpmn[];
	}
}
