import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
	imports: [
		ScheduleModule.forRoot()
	],
	providers: [TaskService],
	controllers: [TaskController]
})
export class TaskModule {
}
