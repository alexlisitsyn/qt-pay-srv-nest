import { Injectable, Logger } from "@nestjs/common";
import { DbService } from "../../db/db.service";

@Injectable()
export class TaskService {
	constructor(
		private dbService: DbService
	) {
	}

	private readonly logger = new Logger(TaskService.name);



}
