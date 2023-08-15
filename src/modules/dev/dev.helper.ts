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
    console.log(">>> transferBalance +");
    // if (scope.environment.output.balance > 5000) {
    //   console.log(">>> transferBalance +");
    // } else {
    //   console.log(">>> transferBalance -");
    //   result = false;
    // }
  } catch (err) {
    return callback(null, err);
  }

  return callback(null, result);
}

// export async function checkBalance(scope, callback) {
//   try {
//     var result = scope.environment.output.balance > 5000;
//
//     console.log(">>> checkBalance result:", result);
//   } catch (err) {
//     return callback(null, err);
//   }
//
//   return callback(null, result);
// }

export async function checkBalance(balance, test) {
  const res = balance > test ? 1 : 0;
  console.log(">>> checkBalance balance, test, res:", balance, test, res);
  return res;
}
