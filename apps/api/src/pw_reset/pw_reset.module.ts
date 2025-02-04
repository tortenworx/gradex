import { Module } from '@nestjs/common';
import { PwResetService } from './pw_reset.service';
import { PwResetController } from './pw_reset.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordResetRequest, PasswordResetRequestSchema } from 'src/schemas/pw_request.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Credential, CredentialSchema } from 'src/schemas/credentials.schema';
import { CredentialsModule } from 'src/credentials/credentials.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PasswordResetRequest.name, schema: PasswordResetRequestSchema },
      { name: User.name, schema: UserSchema },
      { name: Credential.name, schema: CredentialSchema },
    ]),
    CredentialsModule
  ],
  controllers: [PwResetController],
  providers: [PwResetService],
})
export class PwResetModule {}
