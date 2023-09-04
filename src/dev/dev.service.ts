import { Injectable, Logger } from "@nestjs/common";
import { BpmnService } from "../modules/bpmn/bpmn.service";

@Injectable()
export class DevService {
  constructor(
    private bpmnService: BpmnService
  ) {
  }

  private readonly logger = new Logger(DevService.name);

  async bpmnRun(params: any) {
    return await this.bpmnService.execEngineByName(params.task as string, params.options);
  }

}
