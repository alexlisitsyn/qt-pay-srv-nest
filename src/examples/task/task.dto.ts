import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Наименование', example: 'task1' })
  name: string

  @ApiProperty({ description: 'Кол-во секунд таймаута', example: 15 })
  seconds: number
}

export class TaskDto {
  @ApiProperty({ example: 12, description: 'Идентификатор поста' })
  id: number

  @ApiProperty({ example: 'Пример поста', description: 'Наименование поста' })
  title: string

  @ApiProperty({ example: 'Какое-то содержимое', description: 'Содержимое поста' })
  content: string

  @ApiProperty({ example: 123, description: 'Идентификатор автора' })
  authorId: number

  @ApiProperty({ example: new Date(), description: 'Дата/время создания' })
  createdAt: Date
}
