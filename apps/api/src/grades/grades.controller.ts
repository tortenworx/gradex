import { Body, Controller, Get, Param, Patch, Post, Req, Request, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { Roles } from '../credentials/decorator/roles.decorator';
import { CreateReportDto } from './dto/create-report.dto';
import { CredentialsGuard } from '../credentials/credentials.guard';
import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { MongoIdParam } from 'src/classes/dto/id-param.dto';
import { UpdateGradesDto } from './dto/update-grade.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('/')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async createGradeReport(
    @Request() request,
    @Body() createGradeReportDto: CreateReportDto,
  ): Promise<any> {
    return await this.gradesService.newReport(
      createGradeReportDto,
      request.user.sub,
    );
  }

  @Get('/:id')
  @Roles(['FACULTY', 'SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async getWan(@Param() params: MongoIdParam, @Req() request) {
    return await this.gradesService.fetchReport(params.id, request.user.sub)
  }

  @Get('/')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async getOl(@Req() request) {
    return await this.gradesService.fetchAllReports(request.user.sub)
  }

  @Patch('/:id')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async updateGrades(@Param() params: MongoIdParam, @Body() updateGradesDto: UpdateGradesDto) {
    return await this.gradesService.updateReport(params.id, updateGradesDto)
  }

  @Get('/ezgrade/:id')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async exportEzGrade(@Res({ passthrough: true }) res: Response, @Param() params) {
    const file = await this.gradesService.exportToEzGrade(params.id)
    const tmp = Buffer.from(file)
    return new StreamableFile(tmp, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment; filename="exports.xlsx"'
    });
  }
}
