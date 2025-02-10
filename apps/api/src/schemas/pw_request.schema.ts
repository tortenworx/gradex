import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type PasswordResetRequestDocument = HydratedDocument<PasswordResetRequest>;

@Schema()
export class PasswordResetRequest {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Date, expires: '1h', default: Date.now })
  createdAt: Date;
}

export const PasswordResetRequestSchema = SchemaFactory.createForClass(PasswordResetRequest);
