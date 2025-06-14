import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Roles } from '../credentials/decorator/roles.decorator';
import { CredentialsGuard } from '../credentials/credentials.guard';
import { CreateClassDto } from './dto/create-class.dto';
import { AddUserToClassDto } from './dto/add-user-to-class.dto';
import { Class } from '../schemas/class.schema';
import { AttachSubjectToClassDto } from './dto/attach-subject.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}
  @Post('/create')
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async createClass(@Body() createClassDto: CreateClassDto) {
    return this.classesService.createClass(createClassDto);
  }
  @Put('/students/attach')
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async attachStudentToClass(
    @Body() addUserToClassDto: AddUserToClassDto,
  ): Promise<any> {
    return await this.classesService.attachUserToClass(addUserToClassDto);
  }
  @Put('/subjects/attach')
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async attachSubjectToClass(
    @Body() addSubjectToClass: AttachSubjectToClassDto,
  ): Promise<Class> {
    return await this.classesService.attachSubjectToClass(addSubjectToClass);
  }
}
