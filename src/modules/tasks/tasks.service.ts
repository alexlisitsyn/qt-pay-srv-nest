import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from "cron";

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(TasksService.name);

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('>>> Called when the second is 45');
  // }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('>>> Called every 30 seconds');
  }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('>>> Called every 10 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('>>> Called once after 5 seconds');
  // }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  getCrons() {
    const res: any[] = [];

    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      // this.logger.log(`job: ${key} -> next: ${next}`);
      res.push({
        key,
        next
      });
    });

    return res
  }
}
