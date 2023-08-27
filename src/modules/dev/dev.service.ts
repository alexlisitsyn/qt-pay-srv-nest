import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter } from "events";
import { engine as engine3 } from "../../-old/examples/example3";
import { checkBalance } from "../../bpmn/bpmn-activity";
import { BpmnService } from "../../bpmn/bpmn.service";

@Injectable()
export class DevService {
  private readonly logger = new Logger(DevService.name);

  constructor(
    private bpmnService: BpmnService
  ) {
  }

  // async tmp(params: any) {
  //   console.log("------------tmp3 ----- params:", JSON.stringify(params));
  //
  //   const listener = new EventEmitter();
  //   listener.on("activity.end", (elementApi) => {
  //     console.log(">>> activity.end elementApi.id:", elementApi.id);
  //     if (elementApi.id === "endSkip")
  //       this.logger.log("!!! endSkip");
  //     if (elementApi.id === "endProcess")
  //       this.logger.log("!!! endProcess");
  //   });
  //
  //   const execRes = await engine3.execute({
  //     listener,
  //     variables: {
  //       balance: params.balance,
  //       apiPath: "https://example.com/test"
  //     },
  //     services: {
  //       // getBalance,
  //       // transferBalance,
  //       checkBalance
  //     }
  //   }, (err, execution) => {
  //     if (err)
  //       throw err;
  //
  //     // console.log("***", execution.name, execution.environment.output);
  //     // console.log(">>> Balance:", execution.environment.output.balance);
  //   });
  //
  //   this.logger.log("tmp3 END");
  //   return execRes.environment.output;
  // }


  async bpmnRun(params: any) {
    return await this.bpmnService.execEngineByName(params.name as string, params.variables);
  }

}
