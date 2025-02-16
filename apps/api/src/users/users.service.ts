import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { NewUserDto } from './dto/create-record.dto';
import { CredentialsService } from '../credentials/credentials.service';
import { Credential } from '../schemas/credentials.schema';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
    private readonly credentialService: CredentialsService,
  ) {}

  async create_user(
    newUserDto: NewUserDto,
  ): Promise<any | UnauthorizedException> {
    const { password, username, ...userObject } = newUserDto;
    const userExists = await this.userModel.findOne({
      $or: [
        { id_number: userObject.id_number },
        { personal_email_address: userObject.personal_email_address },
        { educational_email_address: userObject.educational_email_address },
        { mobile_number: userObject.mobile_number },
      ],
    });
    if (userExists)
      throw new UnauthorizedException('User exists with provided information.');
    const user = await this.userModel
      .create({
        ...userObject,
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (username) {
      console.log(user.id);
      const credentials = await this.credentialService
        .create({
          username,
          password,
          user_id: user.id,
        })
        .catch((err) => {
          console.error(err);
          throw new InternalServerErrorException(err);
        });
      console.log(credentials);
      return { user, credentials };
    }
    return user;
  }
  async getUsers(id?: string): Promise<User[] | User> {
    if (id) return await this.userModel.find({ _id: id }).select('-credential');
    return await this.userModel.find().select('-credential, -__v');
  }
  async deleteUser(id: string): Promise<[any, any]> {
    const user = await this.userModel.findByIdAndDelete(id);
    const userCredentials = await this.credentialModel.deleteOne({
      _id: user.credential,
    });
    return [user, userCredentials];
  }
}
