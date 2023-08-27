import { Test, TestingModule } from '@nestjs/testing';
import { BpmnController } from './bpmn.controller';

describe('BpmnController', () => {
  let controller: BpmnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpmnController],
    }).compile();

    controller = module.get<BpmnController>(BpmnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
