import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Announcement } from 'src/schemas/announcement.schema';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AnnouncementsService {
  constructor (
    @InjectModel(Announcement.name) private readonly announcementSchema: Model<Announcement>,
    @InjectModel(User.name) private readonly userSchema: Model<User>
  ) {}
  async create(createAnnouncementDto: CreateAnnouncementDto, userId: string) {
    const author = await this.userSchema.findById(userId);
    const announcement = await this.announcementSchema.create({
      ...createAnnouncementDto,
      createdBy: author
    });
    return announcement;
  }

  async findAll(isLogin, limit) {
    if (isLogin) {
      return await this.announcementSchema.find({ login_image: { '$exists': true } }).limit(limit)
    } else {
      return await this.announcementSchema.find().limit(limit)
    }
  }

  async findOne(id: string) {
    return await this.announcementSchema.findById(id)
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    console.log(updateAnnouncementDto)
    return await this.announcementSchema.findByIdAndUpdate(id, {
      ...updateAnnouncementDto
    })
  }

  async remove(id: string) {
    return await this.announcementSchema.findByIdAndDelete(id)
  }
}
