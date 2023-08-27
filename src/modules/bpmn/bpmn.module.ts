import { Module } from '@nestjs/common';
import { BpmnService } from './bpmn.service';
import { BpmnController } from './bpmn.controller';

@Module({
  providers: [BpmnService],
  controllers: [BpmnController]
})
export class BpmnModule {}
