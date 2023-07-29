import { Global, Module } from "@nestjs/common";
import { DbController } from "./db.controller";
import { DbService } from "./db.service";

@Global()
@Module({
	controllers: [DbController],
	providers: [DbService],
	exports: [DbService]
})
export class DbModule {
	constructor(private dbService: DbService) {
	}
}
