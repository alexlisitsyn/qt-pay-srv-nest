import { ApiProperty } from '@nestjs/swagger';

export interface ICronOptions {
	seconds?: number
}

export class CreateJobDto {
	@ApiProperty({ description: 'Тип задачи', example: 'job1' })
	task: string

	@ApiProperty({ description: 'Параметры задачи', example: '{}' })
	options: object

	@ApiProperty({ description: 'Параметры планировщика cron', example: '{"seconds": 30}' })
	cronOptions: ICronOptions

	@ApiProperty({ description: 'Запустить', example: true })
	isStart: boolean
}
