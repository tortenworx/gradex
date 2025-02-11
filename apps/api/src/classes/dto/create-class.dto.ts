import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ClassLinks, Strand } from '../../schemas/class.schema';
import { User } from 'src/schemas/user.schema';
import { Subject, SubjectDocument } from 'src/schemas/subject.schema';

export class CreateClassDto {
  @IsMongoId()
  @IsNotEmpty()
  adviser: string;
  @IsNotEmpty()
  section: string;
  @IsEnum(Strand)
  strand: Strand;
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
