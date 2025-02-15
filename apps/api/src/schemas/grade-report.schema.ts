import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Subject } from './subject.schema';

export type GradeReportDocument = HydratedDocument<Subject>;

export enum REPORT_TYPE {
  COLLEGE = 'COLLEGE',
  SENIOR_HIGH = 'SHS',
}

export enum REPORT_STATUS {
  EDITING = 'EDITING',
  PUBLISHED = 'PUBLISHED',
  REVIEWING = 'REVIEWING',
}

type Nullable<T> = T | null

@Schema()
export class GradeReport {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Subject' })
  subject: Subject;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  created_by: User;
  @Prop({ required: true })
  semester: number;
  @Prop()
  quarter: number;
  @Prop({
    required: true,
    type: String,
    enum: REPORT_STATUS,
    default: REPORT_STATUS.EDITING,
  })
  status: string;
  @Prop({
    required: true,
    type: String,
    enum: REPORT_TYPE,
    default: REPORT_TYPE.SENIOR_HIGH,
  })
  type: REPORT_TYPE;
  @Prop({ type: [{user: {type: mongoose.Schema.ObjectId}, avg: {type: Number}}], required: true })
  records: {user: User; avg: Nullable<number>}[];
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date
}

export const GradeReportSchema = SchemaFactory.createForClass(GradeReport);
