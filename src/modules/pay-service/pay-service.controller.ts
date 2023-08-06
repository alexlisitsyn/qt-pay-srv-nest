import { Body, Controller, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PayServiceService } from "./pay-service.service";

export interface IParams {
	name: string;
	method: string;
}

@ApiTags("pay-service")
@Controller({
	path: "pay-service",
	version: "1"
})
export class PayServiceController {
	constructor(
		private payServiceService: PayServiceService
	) {
	}

	@Post("tmp1")
	async tmp1(@Body() params: IParams) {


		return this.payServiceService.tmp1(params);
	}
}
