import { Body, Controller, Get, Param, Patch, Post, Put, Request, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { Roles } from '../credentials/decorator/roles.decorator';
import { CreateReportDto } from './dto/create-report.dto';
import { CredentialsGuard } from '../credentials/credentials.guard';
import { MongoIdParam } from 'src/classes/dto/id-param.dto';
import { UpdateGradesDto } from './dto/update-grade.dto';
import { get } from 'mongoose';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}
  
  @Roles(['USER'])
  @UseGuards(CredentialsGuard)
  @Get('/pdf')
  async exportToPdf(@Res({ passthrough: true }) res: Response, @Request() request) {
    const file = await this.gradesService.exportToPDF(request.user.sub)
    const tmp = Buffer.from(file)
    return new StreamableFile(tmp, {
      type: 'application/pdf',
      disposition: 'attachment; filename="exported.pdf"'
    });
  }

  @Roles(['USER'])
  @UseGuards(CredentialsGuard)
  @Get('/your-report')
  async getUserGrades(@Request() request) {
    return await this.gradesService.getUserReport(request.user.sub)
  }

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
  @Put('/publish/:id')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async pabLeesh(@Param() params: MongoIdParam) {
    return await this.gradesService.publishReport(params.id)
  }

  @Get('/:id')
  @Roles(['FACULTY', 'SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async getWan(@Param() params: MongoIdParam, @Request() request) {
    return await this.gradesService.fetchReport(params.id, request.user.sub)
  }

  @Get('/')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async getOl(@Request() request) {
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
    console.log(params)
    const file = await this.gradesService.exportToEzGrade(params.id)
    const tmp = Buffer.from(file)
    return new StreamableFile(tmp, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment; filename="exports.xlsx"'
    });
  }
}
