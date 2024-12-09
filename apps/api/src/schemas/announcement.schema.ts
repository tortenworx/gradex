import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type AnnouncementDocument = HydratedDocument<Announcement>;

@Schema()
export class Announcement {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  login_image: string;
  @Prop()
  content: string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  createdBy: User;
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const InvitationSchema = SchemaFactory.createForClass(Announcement);
