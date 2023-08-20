interface IActivity {
  run(params: any);
}

class GetBalanceActivity implements IActivity {
  async run(params: any) {
    console.log(">>> run activity getBalance");
    if (params?.environment?.output)
      params.environment.output.transfer = undefined;

    if (params?.environment?.variables)
      return params.environment.variables.balance;

    return false;
  }
}

class TransferBalanceActivity implements IActivity {
  async run(params: any) {
    console.log(">>> run activity transferBalance");
    return true;
  }
}

class ActivityStarter {
  activities: Record<string, IActivity> = {};

  constructor() {
    this.use("getBalance", new GetBalanceActivity());
    this.use("transferBalance", new TransferBalanceActivity());
  }

  use(name: string, activity: IActivity) {
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

export const checkBalance = (cmp) => {
  return cmp > 5000;
}

export async function runActivityById(scope, callback) {
  let result: any;

  try {
    const activity = new ActivityStarter();
    result = await activity.run(scope.id, [scope]);
  } catch (err) {
    return callback(null, err);
  }

  return callback(null, result);
}





