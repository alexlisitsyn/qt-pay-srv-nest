import { Injectable } from "@nestjs/common";
import { huobiHttpService } from "./huobi-http-service";

@Injectable()
export class HuobiService {

  async getMarketTickers() {
    const subRoute = '/market/tickers';
    return await huobiHttpService.call_get(`GET ${subRoute}`, `${process.env.HUOBI_URL_PREFIX}${subRoute}`);
  }

  async demo() {
    return await this.getMarketTickers();
  }
}

export const huobiService = new HuobiService();
