import { Body, Controller, Post, UseGuards, Request, NotFoundException, Delete, Param, Put, Patch, Get } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Roles } from 'src/credentials/decorator/roles.decorator';
import { CredentialsGuard } from 'src/credentials/credentials.guard';
import { DelSubjDto } from './dto/delete-subject.dto';
import { UserAttachDto } from './dto/user-attach.dto';
import { SubjectDto } from './dto/subject.dto';
import { EditSubjectDto } from './dto/edit-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Roles(['SUPERADMIN', "FACULTY"])
  @UseGuards(CredentialsGuard)
  @Post('/')
  async NewSubject(@Body() newSubject: SubjectDto) {
    return await this.subjectsService.newSubject(newSubject)
  }

  // @Roles(['USER', 'FACULTY', 'SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Get('/')
  async get(@Request() request) {
    return await this.subjectsService.getSubjects(request.user.sub)
  }
  
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Put('/attach/user/:id')
  async attach(@Body() UasrAttachDTO: UserAttachDto) {
  }

  @Roles(['SUPERADMIN', 'FACULTY'])
  @UseGuards(CredentialsGuard)
  @Patch('/:id')
  async edit(@Param() params, @Body() editSubjectDto: EditSubjectDto) {
    return await this.subjectsService.editSubject(params.id, editSubjectDto)
  }

  @Roles(['SUPERADMIN', 'FACULTY'])
  @UseGuards(CredentialsGuard)
  @Patch('/update/:id')
  async update(@Param() params) {
    return await this.subjectsService.refreshStudents(params.id)
  }

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Delete('/:id')
  async deleteSubj(@Param() parameters: DelSubjDto) {
    return await this.subjectsService.deleteSubject(parameters.id)
  }
}
