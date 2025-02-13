/**
 * ? This file is unused due to the change of the design in the system,
 * ? see https://github.com/tortenworx/gradex-backend/issues/1 to learn more.
 * ! UPDATE: Decision has been reverted.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { Subject } from './subject.schema';

export type ClassDocument = HydratedDocument<Subject>;

export interface ClassLinks {
  name: string;
  link: string;
}



export enum Program {
  GAS = 'GAS',
  STEM = 'STEM',
  HUMMS = 'HUMMS',
  ABM = 'ABM',
  TVL_HE = 'TVL_HE',
  TVL_ICT = 'TVL_ICT',
  BSIT = 'BSIT',
  BSHM = 'BSTHM',
  BEED = 'BEED',
  BSN = 'BSN',
  BSBA = 'BSBA',
  BSA = 'BSA',
  BSCRIM = 'BSCRIM',
  BSTM = 'BSTM'
}

export enum Type {
  COLLEGE = 'COLLEGE',
  SHS = 'SHS'
}

@Schema()
export class Class {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  adviser: User;
  @Prop({ required: true })
  class_name: string;
  @Prop({ required: true, type: String, enum: Program })
  program: Program;
  @Prop({ required: true, type: String, enum: Type })
  type: Type;
  @Prop({ type: [mongoose.Schema.ObjectId], ref: 'Subject' })
  subjects: Subject[];
  @Prop({ type: [mongoose.Schema.ObjectId], ref: 'User' })
  students: User[];
  @Prop()
  links: ClassLinks[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
