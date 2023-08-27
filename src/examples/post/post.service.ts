import { Injectable } from '@nestjs/common'
import { PostDto, CreatePostDto } from './post.dto'

@Injectable()
export class PostService {
	private readonly posts: CreatePostDto[] = []

	create(post: CreatePostDto) {
		this.posts.push(post)
	}

	getAllPosts(): PostDto[] {
		return this.posts.map((post, i) => ({
			id: i,
			title: post.title,
			content: post.content,
			authorId: post.authorId,
			createdAt: new Date()
		}))
	}
}
