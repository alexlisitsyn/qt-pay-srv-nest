import { Injectable, Logger } from "@nestjs/common";
// import {IBpmnActivity} from "../bpmn.interface";
import {getBalanceActivity} from "./get-balance-activity";
import {transferBalanceActivity} from "./transfer-balance-activity";

@Injectable()
export class BpmnActivityHelper {
  private readonly logger = new Logger(BpmnActivityHelper.name);

  // activities: Record<string, IBpmnActivity> = {};
  activities: Record<string, any> = {};

  constructor(
    // private getBalanceActivity: GetBalanceActivity,
    // private transferBalanceActivity: TransferBalanceActivity
  ) {
    // this.use("getBalance", new GetBalanceActivity());
    // this.use("transferBalance", new TransferBalanceActivity());
    // this.use("getBalance", this.getBalanceActivity);
    // this.use("transferBalance", this.transferBalanceActivity);
    this.use("getBalance", getBalanceActivity);
    this.use("transferBalance", transferBalanceActivity);
  }

  // use(name: string, activity: IBpmnActivity) {
  //   this.activities[name] = activity;
  // }
  use(name: string, activity: any) {
    this.activities[name] = activity;
  }

  run(name: string, params: any) {
    if (!this.activities[name]) {
      this.logger.error(`Unknown activity: ${name}`);
      return false;
      // throw new Error(`Unknown activity: ${scope.id}`);  // ToDo
    }

    // return this.activities[name].run.apply(null, params);

    return this.activities[name](params);
  }
}

// export {
//   IBpmnActivity,
//   // runActivityById,
//   // cmpFirstBigger
// }
