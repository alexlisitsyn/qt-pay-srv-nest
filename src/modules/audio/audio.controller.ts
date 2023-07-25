import {InjectQueue} from '@nestjs/bull';
import {Controller, Post} from '@nestjs/common';
import {Queue} from 'bull';

@Controller('audio')
export class AudioController {
	constructor(@InjectQueue('video') private readonly videoQueue: Queue) {
	}

	@Post('pause')
	async queuePause() {
		const qRes = await this.videoQueue.pause();
		return qRes;
	}

	@Post('resume')
	async queueResume() {
		const qRes = await this.videoQueue.resume();
		return qRes;
	}

	@Post('transcode')
	async transcode() {
		await this.videoQueue.add('transcode', {
				file: 'audio.mp3',
			}, {
				// removeOnComplete: 5
			}
		);
	}
}
