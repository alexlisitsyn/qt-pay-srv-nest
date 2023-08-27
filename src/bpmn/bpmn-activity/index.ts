import {IBpmnActivity} from "../../-bpmn/bpmn-interface";
import {GetBalanceActivity} from "./get-balance-activity";
import {TransferBalanceActivity} from "./transfer-balance-activity";

class ActivityStarter {
  activities: Record<string, IBpmnActivity> = {};

  constructor() {
    this.use("getBalance", new GetBalanceActivity());
    this.use("transferBalance", new TransferBalanceActivity());
  }

  use(name: string, activity: IBpmnActivity) {
    this.activities[name] = activity;
  }

  run(name: string, params: any) {
    if (!this.activities[name]) {
      console.error(`Unknown activity: ${name}`);
      return false;
      // throw new Error(`Unknown activity: ${scope.id}`);  // ToDo
    }

    return this.activities[name].run.apply(null, params);
  }
}

// ToDo: сделать в формате runActivityById
function checkBalance(cmp) {
  return cmp > 5000;
}

async function runActivityById(scope, callback) {
  let result: any;

  try {
    const activity = new ActivityStarter();
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
