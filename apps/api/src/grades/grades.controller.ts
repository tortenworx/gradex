import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { Roles } from '../credentials/decorator/roles.decorator';
import { CreateReportDto } from './dto/create-report.dto';
import { CredentialsGuard } from '../credentials/credentials.guard';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('/new')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async createGradeReport(
    @Request() request,
    createGradeReportDto: CreateReportDto,
  ): Promise<any> {
    return await this.gradesService.newReport(
      createGradeReportDto,
      request.user.sub,
    );
  }
}
