import { Injectable, Logger } from "@nestjs/common";
import {IBpmnActivity} from "../bpmn.interface";
import {GetBalanceActivity} from "./get-balance-activity";
import {TransferBalanceActivity} from "./transfer-balance-activity";




async function getBalanceActivity(params: any) {
  console.log("run activity getBalanceActivity");

  const scope = params[0];

  // clear output values from previous start
  if (scope?.environment?.output) {
    scope.environment.output.transfer = false;
    scope.environment.output.balance = null;
  }

  const {provider, balanceLimit} = scope?.environment?.variables;
  if (provider != 'binance') {
    console.warn('GetBalanceActivity: unknown provider');
    return false;
  }

  if (!balanceLimit) {
    console.warn('GetBalanceActivity: incorrect balanceLimit settings');
    return false;
  }

  const balance = 1234;
  scope.environment.output.balance = balance;
  return balance;
}

async function transferBalanceActivity(params: any) {
  console.log("run activity transferBalance");
  return true;
}


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
    this.use("getBalance", getBalanceActivity);
    this.use("transferBalance", transferBalanceActivity);
    // this.use("getBalance", this.getBalanceActivity);
    // this.use("transferBalance", this.transferBalanceActivity);
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
