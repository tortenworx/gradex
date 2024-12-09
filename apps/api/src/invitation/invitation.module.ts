import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from '../schemas/invitation.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { CredentialsModule } from 'src/credentials/credentials.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CredentialsModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
