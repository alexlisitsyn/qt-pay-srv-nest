export interface IBinanceDeposit {
	amount: string;
	coin: string;
	network: string;
	status: number;
	address: string;
	addressTag: string;
	txId: string;
	insertTime: number;
	transferType: number;
	confirmTimes: string;
	unlockConfirm: number;
	walletType: number;
}

export interface IBinanceTransfer {
	tranId: number;
	fromEmail: string;
	toEmail: string;
	asset: string;
	amount: string;
	createTimeStamp: number;
	fromAccountType: string;
	toAccountType: string;
	status: string;
	clientTranId: string;
}

export interface IBinanceTransferCreateRes {
	tranId: number;
	clientTranId: string;
}
