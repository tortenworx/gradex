import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from 'src/schemas/subject.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Class, ClassSchema } from 'src/schemas/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: User.name, schema: UserSchema },
      { name: Class.name, schema: ClassSchema }
    ])
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
