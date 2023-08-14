// export const getRequest = async () => {
//   console.log("Dev Helper > getRequest");
//
//   return Promise.resolve({balance: 1245})
// }

export async function getBalance(scope, callback) {
  try {
    // var result = await getJson(scope.environment.variables.apiPath); // eslint-disable-line no-var
    // var result = 12405;
    var result = scope.environment.variables.balance;
  } catch (err) {
    return callback(null, err);
  }

  return callback(null, result);
}

export async function transferBalance(scope, callback) {
  try {
    var result = true;
    if (scope.environment.output.balance > 5000) {
      console.log(">>> transferBalance +");
    } else {
      console.log(">>> transferBalance -");
      result = false;
    }
  } catch (err) {
    return callback(null, err);
  }

  return callback(null, result);
}

export async function checkBalance(balance) {
  const test = 5000;
  const res = balance > test;
  console.log(">>> checkBalance balance, test, res:", balance, test, res);
  return res;
}
