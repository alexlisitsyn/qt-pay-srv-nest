import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IParams } from "../modules/pay-service/pay-service.controller";
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

	// @Post("tmp")
	// @HttpCode(200)
	// async runTmp(@Body() params: IParams) {
	// 	return this.devService.tmp(params);
	// }
	//
	// @Post("account-balance")
	// @HttpCode(200)
	// async runAccountBalance(@Body() params: IParams) {
	// 	return this.devService.runAccountBalance(params);
	// }

	@Post("bpmn-run")
	@HttpCode(200)
	async bpmnRun(@Body() params: IParams) {
		return this.devService.bpmnRun(params);
	}
}