import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeReport, GradeReportSchema } from '../schemas/grade-report.schema';
import { Subject, SubjectSchema } from '../schemas/subject.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Class, ClassSchema } from 'src/schemas/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GradeReport.name, schema: GradeReportSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: User.name, schema: UserSchema },
      { name: Class.name, schema: ClassSchema },
    ]),
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
