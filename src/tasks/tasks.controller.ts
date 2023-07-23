import { Controller, Get, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller('tasks')
export class TasksController {
	constructor(private taskService: TasksService) {

	}

	// @Post()
	// async create(@Body() createPostDto: CreatePostDto) {
	// 	return this.postService.create(createPostDto);
	// }

	@Get()
	async getAllTasks() {
		return this.taskService.getCrons();
	}
}
