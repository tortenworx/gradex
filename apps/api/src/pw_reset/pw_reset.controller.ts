import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PwResetService } from './pw_reset.service';
import { CreatePwResetDto } from './dto/create-pw_reset.dto';
import { ResolvePwResetDto } from './dto/resolve-pw_reset.dto';
import { PwResetDto } from './dto/reset-pw.dto';

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

  @Patch()
  newPassword(@Body() resetPasswordDto: PwResetDto) {
    return this.pwResetService.resetPassword(resetPasswordDto);
  }
}
