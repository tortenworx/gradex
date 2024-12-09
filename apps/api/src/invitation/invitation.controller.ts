import {
  Get,
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { CredentialsGuard } from '../credentials/credentials.guard';
import { Roles } from '../credentials/decorator/roles.decorator';
import { ResendInvitationDto } from './dto/resend-invitation.dto';
import { confirmInvitationDTO } from './dto/confirm-invitation.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Post('/send')
  async sendInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
    @Request() request,
  ): Promise<object> {
    return await this.invitationService.createInvitation(
      createInvitationDto,
      request.sub.user,
    );
  }
  @Post('/resend')
  async resendInvitation(
    @Body() resendInvitationDto: ResendInvitationDto,
    @Request() request,
  ): Promise<object> {
    if (request.sub) {
      return await this.invitationService.resendInvitation(
        resendInvitationDto,
        request.sub.user,
      );
    }
    return await this.invitationService.resendInvitation(resendInvitationDto);
  }
  @Get('/resolve/:id')
  async resolveInvtiation(@Param('id') id): Promise<object> {
    return await this.invitationService.resolve(id);
  }
  @Post('/confirm')
  async confirmInvitation(
    @Body() confirmInvitationDto: confirmInvitationDTO,
  ): Promise<boolean> {
    return await this.invitationService.confirm(confirmInvitationDto);
  }
}
