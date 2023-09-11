import { Injectable } from "@nestjs/common";
// import { HuobiHttpService } from "./huobi-http-service";
import huobiHttpService from "./huobi-http-service";

export interface IAccountBalanceElement {
  currency: string;
  type?: string;
  balance: string;
  available?: string;
  debt?: string;
  'seq-num'?: string;
}


@Injectable()
export class HuobiService {

  constructor(
  ) {
  }

  async getMarketTickers() {
    const result = await huobiHttpService.get('/market/tickers');
    return result.data;
  }

  async getAccountAccounts() {
    const result = await huobiHttpService.signedGet('/v1/account/accounts');
    return result.data;
  }

  async getAccountBalance(accountId: string | number) {
    const result = await huobiHttpService.signedGet(`/v1/account/accounts/${accountId}/balance`);
    return result.data;
  }

  async getAccountBalancePositive(accountId: string | number) {
    const rawData = await this.getAccountBalance(accountId);
    return rawData?.data?.list.filter((el: IAccountBalanceElement) => el.balance !== '0');
  }


  async demo() {
    // return await this.getMarketTickers();
    // return await this.getAccountAccounts();
    // return await this.getAccountBalance('58574798');
    return await this.getAccountBalancePositive('58574798');

    // return await huobiHttpService.test();
  }
}

export const huobiService = new HuobiService();
