import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Query } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CredentialsGuard } from 'src/credentials/credentials.guard';
import { Roles } from 'src/credentials/decorator/roles.decorator';
import { request } from 'http';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Req() request) {
    return this.announcementsService.create(createAnnouncementDto, request.user.sub);
  }

  @Get()
  findAll(@Query() query) {
    return this.announcementsService.findAll(query.login, query.limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }


  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementsService.update(id, updateAnnouncementDto);
  }

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(id);
  }
}
