import { Injectable, Logger } from "@nestjs/common";
import {IBpmnActivity} from "../bpmn.interface";
import {GetBalanceActivity} from "./get-balance-activity";
import {TransferBalanceActivity} from "./transfer-balance-activity";

@Injectable()
export class BpmnActivityHelper {
  private readonly logger = new Logger(BpmnActivityHelper.name);

  activities: Record<string, IBpmnActivity> = {};

  constructor(
    private getBalanceActivity: GetBalanceActivity,
    private transferBalanceActivity: TransferBalanceActivity
  ) {
    // this.use("getBalance", new GetBalanceActivity());
    // this.use("transferBalance", new TransferBalanceActivity());
    this.use("getBalance", this.getBalanceActivity);
    this.use("transferBalance", this.transferBalanceActivity);
  }

  use(name: string, activity: IBpmnActivity) {
    this.activities[name] = activity;
  }

  run(name: string, params: any) {
    if (!this.activities[name]) {
      this.logger.error(`Unknown activity: ${name}`);
      return false;
      // throw new Error(`Unknown activity: ${scope.id}`);  // ToDo
    }

    return this.activities[name].run.apply(null, params);
  }
}

// ToDo: сделать в формате runActivityById
//  перенести в проверку параметров переменные окружения
function checkBalance(balance, balanceLimit) {
  console.log('> checkBalance > balance, balanceLimit:', balance, balanceLimit);
  return balance > balanceLimit;
}

async function runActivityById(scope, callback) {
  let result: any;

  try {
    const activity = new BpmnActivityHelper();
    result = await activity.run(scope.id, [scope]);
  } catch (err) {
    return callback(null, err);
  }

  return callback(null, result);
}

export {
  IBpmnActivity,
  runActivityById,
  checkBalance
}
