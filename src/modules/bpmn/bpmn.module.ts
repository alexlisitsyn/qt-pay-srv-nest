import { Global, Module } from "@nestjs/common";
import { BpmnController } from './bpmn.controller';
import { BpmnService } from './bpmn.service';
import { BpmnModel } from "./bpmn.model";

@Global()
@Module({
  controllers: [BpmnController],
  providers: [BpmnService, BpmnModel],
  exports: [BpmnService, BpmnModel]
})
export class BpmnModule {}
