import { Body, Controller, Post, UseGuards, Request, NotFoundException, Delete, Param, Put } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { NewSubjectDto } from './dto/new-subject.dto';
import { Roles } from 'src/credentials/decorator/roles.decorator';
import { CredentialsGuard } from 'src/credentials/credentials.guard';
import { DelSubjDto } from './dto/delete-subject.dto';
import { UserAttachDto } from './dto/user-attach.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Post('new')
  async NewSubject(
    @Body() newSubject: NewSubjectDto,
    @Request() request) {
    if (!request.user.sub)
      throw new NotFoundException(
      '[SN00] An error occured that should not happeen. Contact support if error sustains.',
      'No user was found on authorization header.'
    )
    return await this.subjectsService.newSubject(newSubject, request.user.sub)
  }
  
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Put('/attach')
  async attach(@Body() UsrAttachDTO: UserAttachDto) {
    
  }

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Delete('/delete/:id')
  async deleteSubj(@Param() parameters: DelSubjDto) {
    return await this.subjectsService.deleteSubject(parameters.id)
  }
}
