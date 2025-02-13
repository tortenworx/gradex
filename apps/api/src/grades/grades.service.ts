import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GradeReport, REPORT_STATUS, REPORT_TYPE } from '../schemas/grade-report.schema';
import { Subject } from '../schemas/subject.schema';
import { User } from '../schemas/user.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { Model } from 'mongoose';
import { exportSpreadsheet, GradeData } from 'src/utils/ezgrade';
import { MongoIdParam } from 'src/classes/dto/id-param.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(GradeReport.name) private gradeReportModel: Model<GradeReport>,
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async newReport(createReportDto: CreateReportDto, originUserId: string) {
    const reportAuthor = await this.userModel.findById(originUserId);
    if (!reportAuthor)
      throw new NotFoundException(
        'No user attached on the authorization header. Contact support.',
      );
    const subject = await this.subjectModel.findById(createReportDto.subject)
    if (!subject)
      throw new NotFoundException(
        'No subject was found with the provided information.'
    );
    const exisitingReport = await this.gradeReportModel.findOne({
      $and: [
        { subject: subject },
        { status: "EDITING" }
      ]
    })
    console.log(exisitingReport)
    if (exisitingReport) throw new UnauthorizedException('[GR2C] Another unpublished report exists!')
    const report = new this.gradeReportModel()
    report.subject = subject
    report.created_by = reportAuthor
    report.semester = createReportDto.semester
    report.type = createReportDto.type || REPORT_TYPE.SENIOR_HIGH
    report.status = REPORT_STATUS.EDITING
    subject.students.forEach((i) => {
      report.records.push({
        user: i,
        avg: null,
      })
    })
    return await report.save()
  }

  async exportToEzGrade(id: string) {
    const report = await this.gradeReportModel.findById(id).populate('records.user')
    const subject = await this.subjectModel.findOne(report.subject)
    if (!report) throw new NotFoundException('[GR0EZ] No report found.')
    if (report.status !== 'EDITING') throw new UnauthorizedException('[GR1EZ] Cannot export on an published report')
    const arr: GradeData[] = [];
    for (const i of report.records) {
      const user = await this.userModel.findOne(i.user)
      arr.push({
        id: user.id,
        grades: [i.avg, null],
        name: `${user.last_name}, ${user.first_name} ${user.middle_name}`,
        gender: user.gender
      })
    }
    return exportSpreadsheet({ classId: subject.id, recordId: report.id }, arr)
  }

  // !NOTICE: Depreciated
  // async createReport(
  //   createGradeReportDto: CreateGradeReportDto,
  //   originUserId: string,
  // ) {
  //   const originUser = await this.userModel.findById(originUserId);
  //   if (!originUser)
  //     throw new NotFoundException(
  //       'No user attached on the authorization header. Contact support.',
  //     );
  //   const report = new this.gradeReportModel();
  //   report.created_by = originUser;
  //   report.semester = createGradeReportDto.semester;
  //   report.type = createGradeReportDto.type;
  //   if (createGradeReportDto.status)
  //     report.status = createGradeReportDto.status;
  //   createGradeReportDto.grades.map(async (data) => {
  //     const user = await this.userModel.findById(data.user);
  //     report.records.push({
  //       user,
  //       avg: data.avg,
  //     });
  //   });
  //   return report.save();
  // }
}
