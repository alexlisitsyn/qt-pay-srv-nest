import { Body, Controller, Get, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("task")
@Controller({
	path: "task",
	version: "1"
})
export class TaskController {
	constructor(private taskService: TaskService) {
	}

}
