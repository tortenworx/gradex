import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Credential } from './credentials.schema';

export type UserDocument = HydratedDocument<User>;

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export enum Role {
  USER = 'USER',
  FACULTY = 'FACULTY',
  SUPERADMIN = 'SUPERADMIN',
}

@Schema({ autoSearchIndex: true })
export class User {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  id_number: string;

  @Prop({ required: true })
  first_name: string;

  @Prop()
  middle_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  mobile_number: number;

  @Prop()
  personal_email_address: string;

  @Prop({ required: true })
  educational_email_address: string;

  @Prop({ required: true, type: String, enum: Gender })
  gender: Gender;

  @Prop({ required: true, type: String, enum: Role, default: Role.USER })
  role: Role;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Credential' })
  credential: Credential;
}

export const UserSchema = SchemaFactory.createForClass(User);
