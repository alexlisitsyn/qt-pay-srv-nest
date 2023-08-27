import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('video')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  async processTranscode (data) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(data);
    this.logger.debug('Transcoding completed');
  }

  async delay (delay = 1000, callback = () => {}) {
    const delayPromise = ms => new Promise(res => setTimeout(res, ms));
    await delayPromise(delay);
    callback();
  }

  @Process('transcode')
  async handleTranscode(job: Job) {
    this.logger.debug('>> get job');
    await this.delay(3000, () => this.processTranscode(job.data));
  }
}
