import { Controller } from '@nestjs/common';
import { AnouncementsService } from './anouncements.service';

@Controller('anouncements')
export class AnouncementsController {
  constructor(private readonly anouncementsService: AnouncementsService) {}
}
