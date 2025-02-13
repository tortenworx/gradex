import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { Class } from './class.schema';

export type SubjectDocument = HydratedDocument<Subject>;

interface SubjectLinks {
  name: string;
  link: string;
}

@Schema()
export class Subject {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  teacher: User;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;
  @Prop({ length: 255 })
  description: string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Class' })
  linked_class: Class;
  @Prop()
  links: SubjectLinks[];
  @Prop({ type: [mongoose.Schema.ObjectId], ref: 'User' })
  students: User[]
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
