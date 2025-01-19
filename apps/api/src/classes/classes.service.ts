import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from '../schemas/class.schema';
import { Subject } from '../schemas/subject.schema';
import { Role, User } from '../schemas/user.schema';
import { CreateClassDto } from './dto/create-class.dto';
import { AttachSubjectToClassDto } from './dto/attach-subject.dto';
import { AddUserToClassDto } from './dto/add-user-to-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(Class.name) private classModel: Model<Class>,
  ) {}

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    console.log(createClassDto);
    const adviser = await this.userModel.findById(createClassDto.adviser);
    if (!adviser || adviser.role !== Role.FACULTY)
      throw new NotFoundException(
        'No faculty member was found with the provided User ID.',
      );
    const createdClass = await this.classModel.create({
      adviser,
      strand: createClassDto.strand,
      section: createClassDto.section,
    });
    return createdClass;
  }
  async attachSubjectToClass(attachSubjectToClassDto: AttachSubjectToClassDto) {
    const classToEdit = await this.classModel.findById(
      attachSubjectToClassDto.class,
    );
    const subject = await this.subjectModel.findById(
      attachSubjectToClassDto.subject,
    );
    if (!classToEdit)
      throw new NotFoundException(
        'No class found with the provided ID. Check ID, then try again.',
      );
    if (!subject)
      throw new NotFoundException(
        'No subject found with the provided ID. Check ID, then try again.',
      );
    classToEdit.stubjects.push(subject);
    return classToEdit.save();
  }
  async attachUserToClass(addUserToClassDto: AddUserToClassDto) {
    const classToAdd = await this.classModel.findById(
      addUserToClassDto.for_class,
    );
    const student = await this.userModel.findById(addUserToClassDto.user_id);
    if (!classToAdd)
      throw new NotFoundException(
        '[CA1] An error occured while trying to attach student to class.',
        { description: 'No class found with the provided ID.' },
      );
    if (!student)
      throw new NotFoundException(
        '[CAU2] An error occured when trying to attach student to class.',
        {
          description: 'No student found with the provided ID.',
        },
      );
    if (student.role !== Role.USER) {
      throw new UnprocessableEntityException('[CAU3] An error occured.', {
        description: 'The user is not a student.',
      });
    }
    return this.classModel.updateOne(
      { _id: classToAdd._id },
      { $push: { students: student } },
    );
  }
}
