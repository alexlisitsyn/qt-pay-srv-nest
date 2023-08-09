import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IParams } from "../pay-service/pay-service.controller";
import { DevService } from "./dev.service";

@ApiTags("dev")
@Controller({
	path: "dev",
	version: "1"
})
export class DevController {
	constructor(
		private devService: DevService
	) {
	}

	@Post("tmp1")
	@HttpCode(200)
	async getBalance(@Body() params: IParams) {
		return this.devService.tmp1(params);
	}
}
