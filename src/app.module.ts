import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { AudioModule } from './modules/audio/audio.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot(
      // 'alternative-config',
      {
      redis: {
        host: 'localhost',
        port: 6379
      },
    }),
    ScheduleModule.forRoot(),
    PostModule,
    AudioModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
