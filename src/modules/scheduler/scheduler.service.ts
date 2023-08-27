import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { DbService } from "../../db/db.service";
import { CreateJobDto } from "./scheduler.dto";
import { CronJob } from "cron";
import { BpmnService } from "../bpmn/bpmn.service";

@Injectable()
export class SchedulerService {
	constructor(
		private schedulerRegistry: SchedulerRegistry,
		private dbService: DbService,
		private bpmnService: BpmnService
	) {
	}

	private readonly logger = new Logger(SchedulerService.name);

	// @Cron('45 * * * * *')
	// handleCron() {
	//   this.logger.debug('>>> Called when the second is 45');
	// }

	// @Cron(CronExpression.EVERY_30_SECONDS)
	// handleCron() {
	//   this.logger.debug('>>> Called every 30 seconds');
	// }

	// @Interval(10000)
	// handleInterval() {
	//   this.logger.debug('>>> Called every 10 seconds');
	// }

	// @Timeout(5000)
	// handleTimeout() {
	//   this.logger.debug('>>> Called once after 5 seconds');
	// }

	async addJob(newJob: CreateJobDto) {
		const { task, options, cronOptions, isStart } = newJob;

		// ToDo: Проверяем на дубликат задачи
		//  реализовать метод в фабрике задач, который проверяет на дубликат, в зависимости от типа задачи
		// const existJob = await this.dbService.getById('s_job', name);
		// if (existJob.rowCount)
		// 	throw new HttpException(`Job ${name} already exists`, HttpStatus.CONFLICT);

		// ToDo: добавляем в таблицу в статусе new (default)
		const dbJob = await this.dbService.insertOne("s_job", {
			task,
			options: options ?? {},
			cron_options: cronOptions,
		});

		if (!dbJob.rowCount)
			throw new HttpException(`Incorrect jobs parameters`, HttpStatus.BAD_REQUEST);

		const newId = dbJob?.rows[0]?.id;
		if (!newId)
			throw new HttpException(`Create jobs failed`, HttpStatus.BAD_REQUEST);

		const jobName = `job-${newId}`;

		// ToDo: создаем джоб со специфическим ключом
		// ToDo: корректные параметры cronOptions
		const job = new CronJob(`${cronOptions.seconds} * * * * *`, () => {
			this.logger.log(`time (${cronOptions.seconds}) for job task ${jobName} to run!`);
		});

		this.schedulerRegistry.addCronJob(jobName, job);

		if (isStart)
			job.start();

		// ToDo: обновляем статус задачи в базе в зависимости от isStart

		this.logger.log(`job ${jobName} added for each minute at ${cronOptions.seconds} seconds!`);
	}

	async deleteJob(name: string) {
		this.schedulerRegistry.deleteCronJob(name);
		this.logger.warn(`job ${name} deleted!`);
	}

	async getJobs() {
		const res: any[] = [];

		const jobs = this.schedulerRegistry.getCronJobs();
		jobs.forEach((value, key, map) => {
			let next, last;
			try {
				next = value.nextDates().toJSDate();
			} catch (e) {
				next = "error: next fire date is in the past!";
			}
			try {
				last = value.lastDate();
			} catch (e) {
				last = "";
			}
			// this.logger.log(`job: ${key} -> next: ${next}`);
			res.push({ key, next, last });
		});

		return res;
	}

	async initJobsFromDB () {
		const dbJobs = await this.dbService.getAllData("s_job");

		this.logger.log(`initJobsFromDB, count: ${dbJobs.length}`);

		dbJobs.forEach(dbJob => {
			const jobName = `job-${dbJob.id}`;

			const job = new CronJob(`${dbJob.cron_options.seconds} * * * * *`, () => {
				this.logger.log(`time (${dbJob.cron_options.seconds}) for job task ${jobName} to run!`);

				this.bpmnService.execEngineByName(dbJob.task);
			});

			this.schedulerRegistry.addCronJob(jobName, job);

			if (dbJob.status !== 'hold')
				job.start();
		})
	}

}
