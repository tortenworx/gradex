import { Test, TestingModule } from '@nestjs/testing';
import { PwResetController } from './pw_reset.controller';
import { PwResetService } from './pw_reset.service';

describe('PwResetController', () => {
  let controller: PwResetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PwResetController],
      providers: [PwResetService],
    }).compile();

    controller = module.get<PwResetController>(PwResetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
