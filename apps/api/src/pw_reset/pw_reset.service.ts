import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePwResetDto } from './dto/create-pw_reset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { PasswordResetRequest } from 'src/schemas/pw_request.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { Credential } from 'src/schemas/credentials.schema';
import { ResolvePwResetDto } from './dto/resolve-pw_reset.dto';
import { PwResetDto } from './dto/reset-pw.dto';
import { argon2d, argon2i } from 'argon2';
import { CredentialsService } from 'src/credentials/credentials.service';

@Injectable()
export class PwResetService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
    @InjectModel(PasswordResetRequest.name) private pwModel: Model<PasswordResetRequest>,
    private credentialService: CredentialsService
  ) {}

  async create(createPwResetDto: CreatePwResetDto) {
    const isUsernameIdNumber = createPwResetDto.username.match(
      /^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g,
    );
    if (isUsernameIdNumber) {
      const user = await this.userModel.findOne({
        id_number: createPwResetDto.username
      });
      if (!user) throw new NotFoundException('[PWR1] No user was found with the provided information.')
      if (user.role !== "USER") throw new UnauthorizedException('[PWR0] Only user accounts can request for password requests using this method.')
      const resetDoc = await this.pwModel.create({
        user: user,
      })
      await this.mailerService.sendMail({
          to: user.educational_email_address,
          from: 'The GradeX Team <gradex@lyra-research.site>',
          subject: '[GradeX] Reset your password',
          text: `Greeting in peace! \nYou have request a password request at ${(new Date()).toString()}. To reset your password, use the link below. If you did not request for a password reset, you can safely ignore this message.\nReset Link: https://gradex.lyra-research.site/accounts/reset-password?key${resetDoc.id}`,
          template: 'forgot-password',
          context: {
            name: user.first_name,
            reset_link: `https://gradex.lyra-research.site/accounts/reset-password?key=${resetDoc.id}`,
          },
        });
        return {
          statusCode: 200,
          message: 'Password link sent.'
        }
    } else {
      const credential = await this.credentialModel.findOne({
        user_name: createPwResetDto.username
      })
      if (!credential) throw new NotFoundException('[PWR1] No user was found with the provided information.')
      const user = await this.userModel.findOne({
        credential: credential.id
      })
      if (user.role !== "USER") throw new UnauthorizedException('[PWR0] Only user accounts can request for password requests using this method.')
      if (!user) throw new NotFoundException('[PWR1] No user was found with the provided information.')
      const resetDoc = await this.pwModel.create({
        user: user
      })
      await this.mailerService.sendMail({
          to: user.educational_email_address,
          from: 'The GradeX Team <gradex@lyra-research.site>',
          subject: '[GradeX] Reset your password',
          text: `Greeting in peace! \nYou have request a password request at ${(new Date()).toString()}. To reset your password, use the link below. If you did not request for a password reset, you can safely ignore this message.\nReset Link: https://gradex.lyra-research.site/accounts/reset-password?id=${resetDoc.id}`,
          template: 'forgot-password',
          context: {
            name: user.first_name,
            reset_link: `https://gradex.lyra-research.site/accounts/reset-password?id=${resetDoc.id}`,
          },
      });
      return {
        statusCode: 200,
        message: 'Password link sent.'
      }
    }
  }

  async createAdmin(createPwResetDto: CreatePwResetDto, adminId: string) {
    const isAdmin = await this.userModel.findById(adminId)
    const isUsernameIdNumber = createPwResetDto.username.match(
      /^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g,
    );
    if (isUsernameIdNumber) {
      const user = await this.userModel.findOne({
        id_number: createPwResetDto.username
      });
      if (!user) throw new NotFoundException('[PWR1] No user was found with the provided information.')
      const resetDoc = await this.pwModel.create({
        user: user,
      })
      await this.mailerService.sendMail({
          to: user.educational_email_address,
          from: 'The GradeX Team <gradex@lyra-research.site>',
          subject: '[GradeX] Reset your password',
          text: `Greeting in peace! \nYou have request a password request at ${(new Date()).toString()}. To reset your password, use the link below. If you did not request for a password reset, you can safely ignore this message.\nReset Link: https://gradex.lyra-research.site/accounts/reset-password?key${resetDoc.id}`,
          template: 'forgot-password',
          context: {
            name: user.first_name,
            reset_link: `https://gradex.lyra-research.site/accounts/reset-password?key=${resetDoc.id}`,
          },
        });
        return {
          statusCode: 200,
          message: 'Password link sent.'
        }
    } else {
      const credential = await this.credentialModel.findOne({
        user_name: createPwResetDto.username
      })
      if (!credential) throw new NotFoundException('[PWR1] No user was found with the provided information.')
      const user = await this.userModel.findOne({
        credential: credential.id
      })
      if (user.role !== "USER") throw new UnauthorizedException('[PWR0] Only user accounts can request for password requests using this method.')
      if (!user) throw new NotFoundException('[PWR1] No user was found with the provided information.')
      const resetDoc = await this.pwModel.create({
        user: user
      })
      await this.mailerService.sendMail({
          to: user.educational_email_address,
          from: 'The GradeX Team <gradex@lyra-research.site>',
          subject: '[GradeX] Reset your password',
          text: `Greeting in peace! \nYou have request a password request at ${(new Date()).toString()}. To reset your password, use the link below. If you did not request for a password reset, you can safely ignore this message.\nReset Link: https://gradex.lyra-research.site/accounts/reset-password?id=${resetDoc.id}`,
          template: 'forgot-password',
          context: {
            name: user.first_name,
            reset_link: `https://gradex.lyra-research.site/accounts/reset-password?id=${resetDoc.id}`,
          },
      });
      return {
        statusCode: 200,
        message: 'Password link sent.'
      }
    }
  }


  async resolve(resolvePwResetDto: ResolvePwResetDto) {
    const resetDoc = await this.pwModel.findById(resolvePwResetDto.id);
    if (!resetDoc) throw new NotFoundException('[PWRS0] The provided Reset ID either does not exist or has expired.');
    const user = await this.userModel.findById(resetDoc.user).select('-credential -role -personal_email_address -mobile_number -gender');
    if (!user) throw new InternalServerErrorException('[PWRS1] No user was found from the associated reset Id. This could mean that the user no longer exists.');
    return user;
  }

  async resetPassword(resetPasswordDto: PwResetDto) {
    const resetDoc = await this.pwModel.findById(resetPasswordDto.id)
    if (!resetDoc) throw new NotFoundException('[PWRS0] The provided Reset ID either does not exist or has expired.')
    const user = await this.userModel.findById(resetDoc.user)
    if (!user) throw new InternalServerErrorException('[PWRS1] No user was found from the associated reset Id. This could mean that the user no longer exists.')
    const pwFunc = await this.credentialService.resetPassword({
      user_id: user.id,
      new_password: resetPasswordDto.new_password
    })
    resetDoc.deleteOne();
    return {
      "message": 'Password reset successfully.'
    }
  }
}
