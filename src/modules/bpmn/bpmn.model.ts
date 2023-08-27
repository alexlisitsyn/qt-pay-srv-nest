import { Injectable, Logger } from "@nestjs/common";
import { IBpmn } from "./bpmn.interface";
import { DbService } from "../../db/db.service";

@Injectable()
export class BpmnModel {

	private readonly logger = new Logger(BpmnModel.name);

	constructor(
		private dbService: DbService
	) {
	}

	async getActiveBpmns(): Promise<IBpmn[]> {
		const dbRes = await this.dbService.query('select * from "bpmn" where active = true') as IBpmn[];
		return dbRes;
	}
}
