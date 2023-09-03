import {payServiceService} from '../../pay-service/pay-service.service';

export const getBalanceActivity = async (params: any) => {
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

	//const balance = 1234;
	const balance = await payServiceService.getBalance(provider);
	scope.environment.output.balance = balance;
	return balance;
}
