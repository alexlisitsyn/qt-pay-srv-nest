import { Injectable, Logger } from "@nestjs/common";
// import { payServiceStrategy } from "./pay-service-strategy";
import { binancePayService } from "./binance/binance-pay-service";
import { huobiPayService } from "./huobi/huobi-pay-service";
import { IPayService } from "./pay-service.interface";
import { IParams } from "./pay-service.controller";

@Injectable()
export class PayServiceService {
  private readonly logger = new Logger(PayServiceService.name);
  // private paySrv = payServiceStrategy;

  private readonly payServices: Record<string, IPayService> = {};

  constructor() {
    this.initModules().then();
  }

  use(name: string, payService: IPayService) {
    this.payServices[name] = payService;
  }

  async initModules() {
    this.logger.log(">>> PayServiceService > initModules");
    // ToDo: возможно динамическое подключение, тогда не нужно дополнительных проверок возможности оплаты
    //  т.е. подключаем модуль, когда есть возможность проведения платежей
    this.use("binance", binancePayService);
    this.use("huobi", huobiPayService);
  }

  // async getBalance(name: string) {
  // 	this.logger.log("getBalance > name:", name);
  // 	return payServiceStrategy.getBalance(name);
  // }
  async getBalance(params: IParams) {
    if (!this.payServices[params.provider]) {
      this.logger.error(`Платежный сервис ${params.provider} не активен`);
      return null;
    }

    return await this.payServices[params.provider].getBalance.call(this.payServices[params.provider], params);
  }

  // ToDo:
// - Создание ордеров на покупку/продажи пары
// - Получение списка операций аккаунта
// - Получение списка ордеров аккаунта
// - Обновление балансов и кошельков
// 	Так же необходимо иметь возможность работать с бинанс п2п:
// - Видеть баланс п2п счета
// - Создавать сделки
// - Участвовать в сделках
// - Вести переписку с контрагентом
}

export const payServiceService = new PayServiceService();
