// export const getRequest = async () => {
//   console.log("Dev Helper > getRequest");
//
//   return Promise.resolve({balance: 1245})
// }

export async function getBalance(scope, callback) {
  let result;

  try {
    // clear output
    scope.environment.output.transfer = undefined;

    // var result = await getJson(scope.environment.variables.apiPath); // eslint-disable-line no-var
    // var result = 12405;
    result = scope.environment.variables.balance;
  } catch (err) {
    return callback(null, err);
  }

  return callback(null, result);
}

export async function transferBalance(scope, callback) {
  let result;
  try {
    console.log(">>> transferBalance +");
    result = true;
  } catch (err) {
    return callback(null, err);
  }

  return callback(null, result);
}

export const checkBalance = (cmp) => {
  return cmp > 5000;
}
