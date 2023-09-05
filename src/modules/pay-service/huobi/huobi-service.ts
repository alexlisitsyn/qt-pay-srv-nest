import { Injectable } from "@nestjs/common";
import { huobiHttpService } from "./huobi-http-service";

@Injectable()
export class HuobiService {
  async demo() {
    // return {status: 'ok'};

    var host_prefix = process.env.HUOBI_URL_PREFIX;
    var getEle = {
      "tip": "GET_1, 获取合约信息",
      "intf_no": "g1",
      "context_path": "/market/tickers",
      // "context_path": "/market/depth",
      // "context_path": "/v1/account/accounts",
    };
    await huobiHttpService.call_get(getEle.tip, host_prefix + getEle.context_path)
  }

}

export const huobiService = new HuobiService();