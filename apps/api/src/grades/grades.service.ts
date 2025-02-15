import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GradeReport, REPORT_STATUS, REPORT_TYPE } from '../schemas/grade-report.schema';
import { Subject } from '../schemas/subject.schema';
import { User } from '../schemas/user.schema';
import { CreateReportDto } from './dto/create-report.dto';
import mongoose, { Model } from 'mongoose';
import { exportSpreadsheet, GradeData } from 'src/utils/ezgrade';
import { MongoIdParam } from 'src/classes/dto/id-param.dto';
import { UpdateGradesDto } from './dto/update-grade.dto';

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
    const report = await this.gradeReportModel.findById(id)
    const subject = await this.subjectModel.findOne(report.subject)
    if (!report) throw new NotFoundException('[GR0EZ] No report found.')
    if (report.status !== 'EDITING') throw new UnauthorizedException('[GR1EZ] Cannot export on an published report')
    const arr: GradeData[] = [];
    for (const i of report.records) {
      const user = await this.userModel.findOne(i.user)
      arr.push({
        id: user.id,
        grade: i.avg,
        name: `${user.last_name}, ${user.first_name} ${user.middle_name}`,
        gender: user.gender
      })
    }
    return exportSpreadsheet({ classId: subject.id, recordId: report.id }, arr)
  }

  async fetchReport(id: string, user_id: string) {
    const data = await this.gradeReportModel.findById(id).populate([
      {
        path: 'records',
        populate: {
          path: 'user', model: 'User', select: 'first_name middle_name last_name'
        }
      }, 
      {
        path: 'subject',
        select: 'name code',
        populate: {
          path: 'linked_class',
          model: 'Class',
          select: 'class_name'
        }
      },
      {
        path: 'created_by',
        select: 'first_name middle_name last_name' 
      }
    ])
    if (!data) throw new NotFoundException('[GR0F] No report found.')
    const reqUser = await this.userModel.findById(user_id)
    if (!reqUser) throw new NotFoundException('[GR1F] Unable to verify authorization.')
    // if (data.created_by.id_number !== reqUser.id_number)
    //   throw new UnauthorizedException('[GR2F] You are not the orignal report owner.')
    return data;
  }

  async fetchAllReports(user_id: string) {
    const user = await this.userModel.findById(user_id)
    if (!user) throw new NotFoundException('[GR0FA] No user was found with the provided information.')
    const data = await this.gradeReportModel.find({ created_by: user._id }).populate([
      {
        path: 'subject',
        select: 'name code',
        populate: {
          path: 'linked_class',
          model: 'Class',
          select: 'class_name'
        }
      }
    ]).select('-records')
    return data;
  }

  async updateReport(id: string, gradeUpdateDto: UpdateGradesDto) {
    const isPublished = await this.gradeReportModel.findById(id)
    if (isPublished.status == REPORT_STATUS.PUBLISHED)
      throw new UnauthorizedException('[GR0UD] This report has been published. You cannot edit this report anymore.')
    const report = await this.gradeReportModel.findByIdAndUpdate(id, {
      $set: {
        records: gradeUpdateDto.records
      }
    })
    return report;
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
