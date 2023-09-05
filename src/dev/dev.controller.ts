import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IParams } from "../modules/pay-service/pay-service.controller";
import { DevService } from "./dev.service";

import { huobiService } from "../modules/pay-service/huobi/huobi-service";

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

	@Post("bpmn-run")
	@HttpCode(200)
	async bpmnRun(@Body() params: IParams) {
		return this.devService.bpmnRun(params);
	}

	@Get("huobi-demo")
	async huobiDemo() {
		return huobiService.demo();
	}
}
