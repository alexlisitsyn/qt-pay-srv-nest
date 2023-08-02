import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SchedulerService } from "./scheduler.service";
import { CreateJobDto } from "./scheduler.dto";

@ApiTags("scheduler")
@Controller({
	path: "scheduler",
	version: "1"
})
export class SchedulerController {
	constructor(
		private schedulerService: SchedulerService
	) {
	}

	@Put()
	async createJob(@Body() createJobDto: CreateJobDto) {
		return this.schedulerService.addJob(createJobDto);
	}

	@Get()
	async getAllJobs() {
		return this.schedulerService.getJobs();
	}
}
