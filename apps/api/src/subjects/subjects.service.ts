import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Subject } from 'src/schemas/subject.schema';
import { Role, User } from 'src/schemas/user.schema';
import { UserAttachDto } from './dto/user-attach.dto';
import { AttachClassDto } from './dto/attach-class.dto';
import { SubjectDto } from './dto/subject.dto';
import { Class } from 'src/schemas/class.schema';
import { EditSubjectDto } from './dto/edit-subject.dto';

@Injectable()
export class SubjectsService {
    constructor (
        @InjectModel(Subject.name) private subjectModel: Model<Subject>,
        @InjectModel(Class.name) private classesModel: Model<Class>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    async getSubjects(userId: string) {
        const user = await this.userModel.findById(userId)
        if (!user) {
            throw new NotFoundException('[SJ0G] Teacher is either invalid or non-existant.')
        }
        if (user.role == Role.FACULTY) {
            return this.subjectModel.find({ teacher: user.id }).populate('students teacher linked_class')
        } else if (user.role == Role.USER) {
            return await this.subjectModel.find({ students: user.id }).populate('teacher').select('-students')
        }
    }
    async newSubject(newSubjectDto: SubjectDto) {
        const teacher = await this.userModel.findById(newSubjectDto.teacher)
        const atClass = await this.classesModel.findOne({ _id: newSubjectDto.forClass }).populate('students')
        if (!atClass) {
            throw new NotFoundException('[SCR1] Class is either invalid or non-existant.')
        }
        if (!teacher) {
            throw new NotFoundException('[SCR0] Teacher is either invalid or non-existant.')
        }
        const subject = await this.subjectModel.create({
            name: newSubjectDto.name,
            description: newSubjectDto.description,
            code: newSubjectDto.code,
            linked_class: atClass,
            teacher: teacher
        })
        await this.subjectModel.findByIdAndUpdate(subject.id, 
            { $addToSet: { students: { $each: atClass.students }}})
        await this.classesModel.findByIdAndUpdate(atClass, {
            $push: {
                "subjects": subject
            }
        })
        return subject;
    }
    async attachClass(attachClassDto: AttachClassDto) {
        const subjectDoc = await this.subjectModel.findById(attachClassDto.subject)
        if (!subjectDoc) {
            throw new NotFoundException('[SJ1AC] Subject is either invalid or non-existent.')
        }
        const classDoc = await this.classesModel.findByIdAndUpdate(attachClassDto.subject, {
            $addToSet: {
                subjects: {
                    subjectDoc
                }
            }
        })
        return classDoc
    }

    async editSubject(id: string, editSubjectDto: EditSubjectDto) {
        return await this.subjectModel.findByIdAndUpdate(id, editSubjectDto)
    }

    async refreshStudents(id: string) {
        const subjectDoc = await this.subjectModel.findById(id)
        const classDoc = await this.classesModel.findOne({ subjects: { $in: [subjectDoc] } })
        if (!subjectDoc) {
            throw new NotFoundException('[SJ1RF] Subject is either invalid or non-existent.')
        }
        if (!subjectDoc) {
            throw new NotFoundException('[SJ1RF] Class linked to subject cannot be found.')
        }
        return await this.subjectModel.findByIdAndUpdate(subjectDoc, {
            $addToSet: {
                students: {
                    $each: classDoc.students
                }
            }
        })
    }

    async deleteSubject(id: string) {
        const subjectDoc = await this.subjectModel.findById(id)
        await this.classesModel.findOneAndUpdate({ subjects: subjectDoc.id }, {
            $pullAll: {
                subjects: [{_id: subjectDoc.id}]
            }
        })
        return await this.subjectModel.findByIdAndDelete(id)
    }
}
