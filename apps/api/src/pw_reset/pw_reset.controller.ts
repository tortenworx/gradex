import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PwResetService } from './pw_reset.service';
import { CreatePwResetDto } from './dto/create-pw_reset.dto';
import { ResolvePwResetDto } from './dto/resolve-pw_reset.dto';
import { PwResetDto } from './dto/reset-pw.dto';
import { CredentialsGuard } from 'src/credentials/credentials.guard';
import { Roles } from 'src/credentials/decorator/roles.decorator';

@Controller('pw-reset')
export class PwResetController {
  constructor(private readonly pwResetService: PwResetService) {}

  @Get(':id')
  resolve(@Param() params: ResolvePwResetDto) {
    return this.pwResetService.resolve(params)
  }

  @Post()
  create(@Body() createPwResetDto: CreatePwResetDto) {
    return this.pwResetService.create(createPwResetDto);
  }

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Post('/admin')
  createAdmin(@Body() createPwResetDto: CreatePwResetDto, @Req() request) {
    return this.pwResetService.createAdmin(createPwResetDto, request.user.sub);
  }

  @Patch()
  newPassword(@Body() resetPasswordDto: PwResetDto) {
    return this.pwResetService.resetPassword(resetPasswordDto);
  }
}
