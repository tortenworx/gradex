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
import { Class } from 'src/schemas/class.schema';
import { createHash } from 'node:crypto';
import { readFileSync, unlinkSync } from 'node:fs';
import path, { join } from 'node:path';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(GradeReport.name) private gradeReportModel: Model<GradeReport>,
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Class.name) private classesModel: Model<Class>
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
      if (user) {
        arr.push({
          id: user.id,
          grade: i.avg,
          name: `${user.last_name}, ${user.first_name} ${user.middle_name}`,
          gender: user.gender
        })
      }
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

  async publishReport(id: string) {
    const report = await this.gradeReportModel.findById(id)
    if (!report) throw new NotFoundException('[GR0PB] No report found.')
    return report.updateOne({ status: "PUBLISHED" })
  }

  async getUserReport(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException('[GR0C] No user found with user id.')
    const classRecord = await this.classesModel.findOne({ students: user }).populate('adviser')
    const data = await Promise.all(classRecord.subjects.map(async (subj) => {
      const record = await this.gradeReportModel.findOne(
        { subject: subj, status: "PUBLISHED" },
        {
          records: {
            $elemMatch: {
              user: user
            }
          }
        })
      if (record) {
        const subject = await this.subjectModel.findById(subj)
        const teacher_obj = await this.userModel.findById(subject.teacher).select('first_name middle_name last_name')
        return {
          subj_name: subject.name,
          code: subject.code,
          teacher: teacher_obj,
          avg: record.records[0].avg
        }
      } else {
        return null
      }
    })
  )
    return {
      full_name: `${user.last_name}, ${user.first_name} ${user.middle_name}`,
      id_number: user.id_number,
      program: classRecord.program,
      class_name: classRecord.class_name,
      class_teacher: `${classRecord.adviser.first_name} ${classRecord.adviser.last_name}`,
      semester: "1",
      records: await data
    };
  }

  async exportToPDF(id: string) {
    const records = await this.getUserReport(id);
    const data = this.render(join(process.cwd(), 'src', 'templates', 'grade-report.hbs'), records)
    return await this.toPdf(data)
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

  private render(filename: string, data: object) {
    var source   = readFileSync(filename,'utf8').toString();
    var template = handlebars.compile(source);
    var output = template(data);
    return output;
  }

  private async toPdf(file: any) {
    const browser = await puppeteer.launch({
      browser: 'chrome',
      headless: true,
      ignoreDefaultArgs: ['--disable-extensions'],
    })

    const page = await browser.newPage()
    await page.setContent(file, {
      waitUntil: 'networkidle2'
    })

    await page.setDefaultNavigationTimeout(2000);
    await page.pdf({
      format: 'A5',
      path: `exported.pdf`,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      printBackground: true,
    });
    
    const pdfFile = readFileSync(`exported.pdf`);

    unlinkSync(`exported.pdf`);

    return pdfFile;
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
