import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Roles } from '../credentials/decorator/roles.decorator';
import { CredentialsGuard } from '../credentials/credentials.guard';
import { CreateClassDto } from './dto/create-class.dto';
import { AddUserToClassDto } from './dto/add-user-to-class.dto';
import { Class } from '../schemas/class.schema';
import { AttachSubjectToClassDto } from './dto/attach-subject.dto';
import { MongoIdParam } from './dto/id-param.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}
  @Get('/')
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async getAllClass() {
    return this.classesService.getAllClasses()
  }

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
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Delete('/:id')
  async deleteClass(@Param() params: MongoIdParam) {
    return await this.classesService.deleteClass(params)
  }
}
