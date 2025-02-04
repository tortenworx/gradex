import { Test, TestingModule } from '@nestjs/testing';
import { PwResetService } from './pw_reset.service';

describe('PwResetService', () => {
  let service: PwResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PwResetService],
    }).compile();

    service = module.get<PwResetService>(PwResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
