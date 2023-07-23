import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePostDto, PostDto } from "./post.dto";
import { PostService } from "./post.service";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";

@ApiTags("post")
@Controller({
	path: "post",
	version: "1"
})
export class PostController {
	constructor(private postService: PostService) {
	}

	@Get()
	@ApiOperation({ summary: "Список всех постов", parameters: [] })
	@ApiOkResponse({
		type: PostDto,
		isArray: true
		// description: 'Список всех постов',
	})
	async getAllPosts(): Promise<PostDto[]> {
		return this.postService.getAllPosts();
	}

	@Post()
	@ApiOperation({ summary: "Создать пост" })
	@ApiCreatedResponse({description: "Пост успешно создан"})
	async create(@Body() createPostDto: CreatePostDto) {
		return this.postService.create(createPostDto);
	}
}
