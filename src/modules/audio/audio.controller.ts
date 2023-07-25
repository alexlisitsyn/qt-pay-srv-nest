import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.videoQueue.add('transcode', {
      file: 'audio.mp3',
    });
  }
}
