import { Logger, Module } from "@nestjs/common";
import { SchedulerController } from "./scheduler.controller";
import { SchedulerService } from "./scheduler.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
	imports: [
		ScheduleModule.forRoot()
	],
	controllers: [SchedulerController],
	providers: [SchedulerService]
})
export class SchedulerModule {

	private readonly logger = new Logger(SchedulerModule.name);

	constructor(
		private schedulerService: SchedulerService
	) {
		// this.logger.log(">>>");
		schedulerService.initJobsFromDB().then();

	}
}
