import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter } from "events";
import { engine as engine1 } from "../../bpmn/examples/example1";
import { engine as engine2 } from "../../bpmn/examples/example2";
import { engine as engine3 } from "../../bpmn/examples/example3";
import { engine as engine4 } from "../../bpmn/examples/example4";
import bpmnService from "../../bpmn/bpmn-service";

import * as path from "path";
import { getFileContent } from "../../bpmn/file-helper";
import { runActivityById, checkBalance } from "../../bpmn/bpmn-activity";

@Injectable()
export class DevService {
  private readonly logger = new Logger(DevService.name);

  async tmp1(params: any) {

    const execRes = await engine1.execute((err, execution) => {
      if (err)
        this.logger.error("Execution completed with error", err);
      else
        this.logger.log("Execution completed with id", execution.environment.variables.id);
    });

    this.logger.log("tmp1 END");

    return execRes.options.variables;
  }

  async tmp2(params: any) {

    const listener = new EventEmitter();
    listener.on("activity.end", (elementApi) => {
      if (elementApi.id === "end2")
        throw new Error(`<${elementApi.id}> should not have been taken`);
    });

    const execRes = await engine2.execute({
      listener,
      services: {
        isBelow: (input, test) => {
          return input < test;
        }
      },
      variables: {
        input: 2  // 2
      }
    });

    engine2.once("end", () => {
      this.logger.log("WOHO!");
    });

    this.logger.log("tmp2 END");

    return execRes.options.variables;
  }

  async tmp3(params: any) {
    this.logger.log("tmp4 params:", params);

    const listener = new EventEmitter();
    listener.on("activity.end", (elementApi) => {
      if (elementApi.id === "end2")
        throw new Error(`<${elementApi.id}> should not have been taken`);
    });

    const execRes = await engine4.execute({
      listener,
      services: {
        isBelow: (input, test) => {
          return input < test;
        }
      },
      variables: {
        input: params.input
      }
    });

    engine4.once("end", () => {
      console.log("WOHO!");
    });

    return execRes.options;
  }

  async tmp(params: any) {
    console.log("------------tmp3 ----- params:", JSON.stringify(params));

    const listener = new EventEmitter();
    listener.on("activity.end", (elementApi) => {
      console.log(">>> activity.end elementApi.id:", elementApi.id);
      if (elementApi.id === "endSkip")
        this.logger.log("!!! endSkip");
      if (elementApi.id === "endProcess")
        this.logger.log("!!! endProcess");
    });

    const execRes = await engine3.execute({
      listener,
      variables: {
        balance: params.balance,
        apiPath: "https://example.com/test"
      },
      services: {
        // getBalance,
        // transferBalance,
        checkBalance
      }
    }, (err, execution) => {
      if (err)
        throw err;

      // console.log("***", execution.name, execution.environment.output);
      // console.log(">>> Balance:", execution.environment.output.balance);
    });

    this.logger.log("tmp3 END");
    return execRes.environment.output;
  }

  async runAccountBalance(variables: any) {
    // // ToDo: move to db
    // const filePath = path.join(__dirname, "../../../bpmn-xml/account-balance.bpmn");
    // const source = getFileContent(filePath);
    //
    // // ToDo: get engine by name or run engine by name
    // const engine = await bpmnService.getEngine({
    //   name: "account-balance",
    //   source
    // });
    //
    // // ToDo: move to listener library and add by parameters
    // const listener = new EventEmitter();
    // listener.on("activity.end", (elementApi) => {
    //   // console.log(">>> activity.end elementApi.id:", elementApi.id);
    //   if (elementApi.id === "endSkip")
    //     this.logger.log("!!! endSkip");
    //   if (elementApi.id === "endProcess")
    //     this.logger.log("!!! endProcess");
    // });
    //
    // const execOptions = {
    //   listener,
    //   variables,
    //   services: {
    //     runActivityById,
    //     checkBalance
    //   }
    // };
    //
    // const execRes = await bpmnService.execEngine(engine, execOptions);
    //
    // this.logger.log("engine account-balance END");
    //
    // return execRes.environment.output;
  }

  async bpmnRun(params: any) {
    return await bpmnService.execEngineByName(params.name as string, params.variables);
  }

}
