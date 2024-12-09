import { Module } from '@nestjs/common';
import { AnouncementsService } from './anouncements.service';
import { AnouncementsController } from './anouncements.controller';

@Module({
  controllers: [AnouncementsController],
  providers: [AnouncementsService],
})
export class AnouncementsModule {}
