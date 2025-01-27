import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GradeReport, REPORT_STATUS, REPORT_TYPE } from '../schemas/grade-report.schema';
import { Subject } from '../schemas/subject.schema';
import { User } from '../schemas/user.schema';
import { CreateReportDto } from './dto/create-report.dto';
import { Model } from 'mongoose';

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
    const report = new this.gradeReportModel()
    report.subject = createReportDto.subject
    report.created_by = reportAuthor
    report.type = createReportDto.type || REPORT_TYPE.SENIOR_HIGH
    report.status = REPORT_STATUS.EDITING
    return report.save()
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
