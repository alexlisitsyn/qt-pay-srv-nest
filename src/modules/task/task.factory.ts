import { Injectable } from "@nestjs/common";

export interface ITask {
	name: string;
	price: number;
}

@Injectable()
export class ProductFactory {
	createTask(type: string): ITask {
		if (type === 'book') {
			return new Book();
		} else if (type === 'movie') {
			return new Movie();
		} else if (type === 'music') {
			return new Music();
		} else {
			throw new Error(`Invalid product type: ${type}`);
		}
	}
}

export class Book implements ITask {
	name = 'Book';
	price = 10;
}

export class Movie implements ITask {
	name = 'Movie';
	price = 20;
}

export class Music implements ITask {
	name = 'Music';
	price = 5;
}
