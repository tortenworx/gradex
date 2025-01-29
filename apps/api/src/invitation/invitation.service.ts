import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User } from '../schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { ResendInvitationDto } from './dto/resend-invitation.dto';
import { Invitation } from 'src/schemas/invitation.schema';
import { confirmInvitationDTO } from './dto/confirm-invitation.dto';
import { CredentialsService } from 'src/credentials/credentials.service';
@Injectable()
export class InvitationService {
  constructor(
    private jwtModule: JwtService,
    private mailerService: MailerService,
    private credentialsService: CredentialsService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Invitation.name) private invitationModel: Model<Invitation>,
  ) {}

  async createInvitation(
    createInvitationDto: CreateInvitationDto,
    fromUserId: string,
  ) {
    const user = await this.userModel.findById(createInvitationDto.userId);
    if (!user)
      throw new BadRequestException('No User was found with provided User ID');
    const author = await this.userModel.findById(fromUserId);
    if (!author)
      throw new InternalServerErrorException(
        '[INV01CR] An unexpected error occured. Consult an IT personel for more details.',
      );
    if (user.credential)
      throw new UnauthorizedException(
        '[INV02RD] This user already has credentials registered.',
      );
    const invitationData = await this.invitationModel.create({
      createdBy: author.id,
      for_user: user.id,
    });
    const invitation_url =
      'http://gradex.ctrl-alt-elite.club/invitation/' + invitationData.id;
    try {
      this.mailerService.sendMail({
        to:
          createInvitationDto.reciepient_address || user.personal_email_address,
        from: 'GradeX <gradex-noreply@mail-distribution.torten.xyz>',
        subject: '[GradeX] Finish your account',
        text:
          'Your account is nearly ready, create your log-in credentials using this link: ' +
          invitation_url,
        template: 'invitation',
        context: {
          first_name: user.first_name,
          invitation_link: invitation_url,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        '[INV01CR] An unexpected error occured. Consult an IT personel for more details.',
      );
    }
    return {
      message: 'Invitation sent successfully.',
    };
  }
  async resendInvitation(
    resendInvitationDto: ResendInvitationDto,
    fromAdminId?: string,
  ) {
    const user = await this.userModel.findOne({
      id_number: resendInvitationDto.id_number,
    });
    if (fromAdminId) {
      const potentialAdmin =
        await this.credentialsService.getUserThruHeaders(fromAdminId);
      if (
        user.role !== Role.USER ||
        (!potentialAdmin && potentialAdmin.role !== Role.SUPERADMIN)
      )
        throw new UnauthorizedException(
          '[INV02RD] Faculty and Administrator accounts cannot regenerate invites thru this channel, please contact an Administrator to generate a new invitation.',
        );
    }
    if (!user)
      throw new NotFoundException(
        '[INV001RD] No user was found with the selected query.',
      );
    if (user.credential)
      throw new UnauthorizedException(
        '[INV03RD] Credentials for this user already exists.',
      );
    const invitationData = await this.invitationModel.create({
      creaetdFor: user,
      createdBy: user,
    });
    const invitation_url =
      'http://gradex.ctrl-alt-elite.club/invitation/' + invitationData.id;
    try {
      this.mailerService.sendMail({
        to: user.educational_email_address,
        from: 'GradeX <gradex-noreply@mail-distribution.torten.xyz>',
        subject: '[GradeX] (Duplicate) Finish your account',
        text: `Greetings in peace! \nYour GradeX account is almost complete, visit the link below to complete your account:\n   ${invitation_url} \nIf this is not you, or have any other concerns regarding GradeX, please consult with the ITC Department.`,
        template: 'invitation',
        context: {
          first_name: user.first_name,
          invitation_link: invitation_url,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        '[INV04RD] An error occured while proccessing your request. Consult an IT personel for more details. This error has been logged internally.',
      );
    }
    return {
      message: "Invitation sent successfully to user's school email address.",
    };
  }
  async resolve(id: string): Promise<object> {
    if (!id)
      throw new BadRequestException(
        '[INV01RS] No Invite ID to be resolved. Check API call, then try again.',
      );
    const invitation = await this.invitationModel.findById(id);
    if (!invitation)
      throw new NotFoundException(
        '[INV02RS] No invite found with the ID specified, this could mean that the invite was either expired or malformed, check your ID, then try again.',
      );
    const user = await this.userModel
      .findOne(invitation.createdFor)
      .select('id_number first_name last_name');
    if (!user)
      throw new BadRequestException(
        '[INV03RS] An unexpected error occured. Consult an IT personel for more details.',
      );
    return user;
  }
  async confirm(confirmInvitationDto: confirmInvitationDTO): Promise<boolean> {
    const invitation = await this.invitationModel.findById(
      confirmInvitationDto.invitationId,
    );
    if (!invitation)
      throw new BadRequestException(
        '[INV01CN] An unexpected error occured. Consult an IT personel for more details.',
      );
    const user = await this.userModel.findOne(invitation.createdFor);
    if (user.id_number !== confirmInvitationDto.id_number) {
      throw new UnauthorizedException('ID Number mismatch.');
    }
    await this.credentialsService.create({
      user_id: user.id,
      ...confirmInvitationDto.credentials,
    });
    return true;
  }
}
