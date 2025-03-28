import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ClassLinks, Type, Program } from '../../schemas/class.schema';
import { User } from 'src/schemas/user.schema';
import { Subject, SubjectDocument } from 'src/schemas/subject.schema';

export class CreateClassDto {
  @IsMongoId()
  @IsNotEmpty()
  adviser: string;
  @IsNotEmpty()
  class_name: string;
  @IsEnum(Program)
  program: Program;
  @IsEnum(Type)
  type: Type;
  @IsOptional()
  @IsArray()
  links: [ClassLinks];
  @IsOptional()
  @IsArray()
  students: [User];
  @IsOptional()
  @IsArray()
  subjects: [Subject];
}
