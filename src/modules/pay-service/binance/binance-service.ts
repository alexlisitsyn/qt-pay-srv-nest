import { Injectable, Logger } from "@nestjs/common";
const {Spot} = require('@binance/connector');


// const binanceClient = new Spot(config.BINANCE.API_KEY, config.BINANCE.SECRET, { baseURL: 'https://testnet.binance.vision'});


@Injectable()
export class BinanceService {

  private readonly logger = new Logger(BinanceService.name);
  private binanceClient = new Spot(process.env.BINANCE_API_KEY, process.env.BINANCE_SECRET);

  // Get account information
  async getAccountInfo() {
    try {
      const qRes = await this.binanceClient.account();
      return qRes.data;
    } catch (e) {
      return null;
    }
  }

  async getSubAccountSpotSummary() {
    try {
      const qRes = await this.binanceClient.subAccountSpotSummary();
      return qRes.data;
    } catch (e) {
      return null;
    }
  }
}

export const binanceService = new BinanceService();
