import { Injectable, Logger } from "@nestjs/common";
import { BpmnService } from "../modules/bpmn/bpmn.service";

// import { EventEmitter } from "events";
// import { engine } from "../-bpmn-old/examples/example3";
// import { runActivityById, checkBalance } from "../-bpmn-old/bpmn-activity";

@Injectable()
export class DevService {
  constructor(
    private bpmnService: BpmnService
  ) {
  }

  private readonly logger = new Logger(DevService.name);

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
    return await this.bpmnService.execEngineByName(params.task as string, params.options);
  }

}
