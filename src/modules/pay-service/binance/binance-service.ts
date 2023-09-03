import { Injectable, Logger } from "@nestjs/common";
import { IBinanceTransferCreateRes } from "./binance-interface";

const { Spot } = require("@binance/connector");

@Injectable()
export class BinanceService {

  private readonly logger = new Logger(BinanceService.name);
  private binanceClient = new Spot(process.env.BINANCE_API_KEY, process.env.BINANCE_SECRET);
  // const binanceClient = new Spot(config.BINANCE.API_KEY, config.BINANCE.SECRET, { baseURL: 'https://testnet.binance.vision'});

  // Get account information
  async getAccountInfo() {
    try {
      const qRes = await this.binanceClient.account();
      return qRes.data;
    } catch (e) {
      this.logger.error('getAccountInfo CATCH', e);
      return null;
    }
  }

  async getDepositHistory(startDate: any = null, endDate: any = null) {
    try {
      let param: any = {};
      if (startDate)
        param.startTime = new Date(startDate).getTime();
      if (endDate)
        param.endTime = new Date(endDate).getTime();

      const qRes = await this.binanceClient.depositHistory(param);
      return qRes.data;
    } catch (e) {
      this.logger.error('getDepositHistory CATCH', e);
      return null;
    }
  }

  async getSubAccountSpotSummary() {
    try {
      const qRes = await this.binanceClient.subAccountSpotSummary();
      return qRes.data;
    } catch (e) {
      this.logger.error('getSubAccountSpotSummary CATCH', e);
      return null;
    }
  }

  // Получение истории депозитов для доп. аккаунта
  async getSubAccountDepositHistory(subAccountEmail: any, startDate: any = null, endDate: any = null) {
    try {
      let param: any = {
        coin: 'USDT',
        status: 1  // (0 - pending, 6 - credited but cannot withdraw, 1 - success)
      };
      if (startDate)
        param.startTime = new Date(startDate).getTime();
      if (endDate)
        param.endTime = new Date(endDate).getTime();

      const qRes = await this.binanceClient.subAccountDepositHistory(subAccountEmail, param);
      return qRes.data;
    } catch (e) {
      this.logger.error(' CATCH', e);
      return null;
    }
  }

  // Трансфер между доп. аккаунтами
  async transferFromSubToMain(amount: number, subAccountEmail: string, txId: string): Promise<IBinanceTransferCreateRes | null> {
    try {
      const qRes = await this.binanceClient.subAccountUniversalTransfer(
        'SPOT',		// fromAccountType
        'SPOT',		// toAccountType
        'USDT',		// asset
        amount,
        {
          fromEmail: subAccountEmail,
          toEmail: process.env.BINANCE_MAIN_ACCOUNT_MAIL,
          clientTranId: txId
        }
      );

      if (qRes.status === 200)
        return qRes.data;

      this.logger.error('transferFromSubToMain', qRes.data ? qRes.data : qRes);
      // ToDo: send to slack
      return null;
    } catch (e) {
      this.logger.error('transferFromSubToMain CATCH', e);
      return null;
    }
  };

  // Трансфер между доп. аккаунтами
  async transferBetweenSubAccounts(asset: string, amount: number, fromEmail: string, toEmail: string, txId: string) {
    try {
      const qRes = await this.binanceClient.subAccountUniversalTransfer(
        'SPOT',
        'SPOT',
        asset,
        amount,
        {
          fromEmail: fromEmail,
          toEmail: toEmail,
          clientTranId: txId
        }
      );
      return qRes.data;
    } catch (e) {
      this.logger.error('getSubAccountIncomingPayment CATCH', e);
      return null;
    }
  };

  // Получение истории входящих трансферов для доп.аккаунта
  async getSubAccountIncomingPayment(accountEmail: string) {
    try {
      const qRes = await this.binanceClient.subAccountUniversalTransferHistory({toEmail: accountEmail});
      return qRes.data;
    } catch (e) {
      this.logger.error('getSubAccountIncomingPayment CATCH', e);
      return null;
    }
  };

  // Получение истории входящих трансферов для главного аккаунта
  async getMainAccountIncomingPayment() {
    try {
      const qRes = await this.binanceClient.subAccountUniversalTransferHistory({toEmail: process.env.BINANCE_MAIN_ACCOUNT_MAIL});
      return qRes.data.result;
    } catch (e) {
      this.logger.error('getMainAccountIncomingPayment CATCH', e.response.data ? e.response.data : e.response);
      return null;
    }
  };

  // Получение трансфера по нашему внутреннему id
  async getTransferByClientTranId(clientTranId: string) {
    try {
      const qRes = await this.binanceClient.subAccountUniversalTransferHistory({
        toEmail: process.env.BINANCE_MAIN_ACCOUNT_MAIL,
        clientTranId: clientTranId
      });
      return qRes.data.result[0];
    } catch (e) {
      this.logger.error('getTransferByClientTranId CATCH', e);
      return null;
    }
  };
}

export const binanceService = new BinanceService();
