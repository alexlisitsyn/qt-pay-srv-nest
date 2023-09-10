import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { PostgresModule } from "nest-postgres";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostModule } from "./examples/post/post.module";
import { AudioModule } from "./examples/audio/audio.module";
import { TaskModule } from "./examples/task/task.module";
import { SchedulerModule } from "./modules/scheduler/scheduler.module";
import { DbModule } from "./db/db.module";
import { DevModule } from "./dev/dev.module";
import { BpmnModule } from "./modules/bpmn/bpmn.module";
import { validationSchema } from "./common/config";
import { PayServiceModule } from "./modules/pay-service/pay-service.module";
import { BinancePayServiceModule } from "./modules/pay-service/binance/binance-pay-service.module";
import { HuobiPayServiceModule } from "./modules/pay-service/huobi/huobi-pay-service.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [".env.local", ".env"],
			// ignoreEnvFile: true,
			validationSchema: validationSchema,
			validationOptions: {
				allowUnknown: true,
				abortEarly: true,
			},
		}),
		BullModule.forRoot(
			// 'alternative-config',
			{
				redis: {
					host: process.env.REDIS_HOST ?? "localhost",
					port: process.env.REDIS_PORT && Number.isInteger(process.env.REDIS_PORT) ? Number(process.env.REDIS_PORT) : 6379
				}
			}),
		PostgresModule.forRoot({
			host: process.env.DB_HOST ?? "localhost",
			port: process.env.DB_PORT && Number.isInteger(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 54321,
			database: process.env.DB_DATABASE ?? "pay-service",
			password: process.env.DB_PASSWORD,
			user: process.env.DB_USER
		}),
		DbModule,
		SchedulerModule,
		TaskModule,
		PostModule,
		AudioModule,
		BpmnModule,
		PayServiceModule,
		BinancePayServiceModule,
		HuobiPayServiceModule,
		DevModule,
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
