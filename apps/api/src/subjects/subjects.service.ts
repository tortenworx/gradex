import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from 'src/schemas/subject.schema';
import { NewSubjectDto } from './dto/new-subject.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SubjectsService {
    constructor (
        @InjectModel(Subject.name) private subjectModel: Model<Subject>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    async newSubject(@Body() newSubjectDto: NewSubjectDto, fromUserId: string) {
        const doesAuthorExists = await this.userModel.findById(fromUserId)
        if (!doesAuthorExists) throw new NotFoundException(
            '[SN00] An error occured that should not happeen. Contact support if error sustains.',
            'User provided on authorization header is invalid or non-existent.'
        )
        console.log(newSubjectDto)
        const createdSubject = await this.subjectModel.create(newSubjectDto)
        return createdSubject;
    }
    async deleteSubject(id: string) {
        return await this.subjectModel.findByIdAndDelete(id)
    }
}
