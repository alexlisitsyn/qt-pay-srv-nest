import { Injectable, Logger } from "@nestjs/common";

export interface IPayService {
	getBalance(args: any[]): any;
}

@Injectable()
export class PayServiceInterface {
	private readonly logger = new Logger(PayServiceInterface.name);

	payServices: Record<string, IPayService> = {};

	use(name: string, payService: IPayService) {
		this.payServices[name] = payService;
	}

	// Получение текущего баланса
	getBalance(name: string, ...args: any) {
		if (!this.payServices[name]) {
			this.logger.error(`Платежный сервис ${name} не активен`);
			return null;
		}

		return this.payServices[name].getBalance.apply(null, args);
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

export default new PayServiceInterface();
