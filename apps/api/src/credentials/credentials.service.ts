import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Credential } from '../schemas/credentials.schema';
import * as argon2 from 'argon2';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CredentialsService {
  constructor(
    private jwtModule: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
  ) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    const user = await this.userModel.findById(createCredentialDto.user_id);
    if (!user) throw new NotFoundException('No user found with designated ID.');
    if (await this.checkIfUsernameTaken(createCredentialDto.username))
      throw new ForbiddenException('Username already taken.');
    const salted_password = await argon2.hash(createCredentialDto.password);
    // Creates the credential record in the database.
    const newCredential = await this.credentialModel.create({
      linked_record: user,
      user_name: createCredentialDto.username,
      salted_password,
    });
    // Saves a record of the credential on the user record for later reference.
    await this.userModel.findByIdAndUpdate(user.id, {
      credential: newCredential,
    });
    return newCredential;
  }

  async authenticate(
    authenticateUserDto: AuthenticateUserDto,
  ): Promise<object> {
    const isUsernameIdNumber = authenticateUserDto.username.match(
      /^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g,
    );
    if (isUsernameIdNumber) {
      console.log('flow', authenticateUserDto);
      const userSearch = await this.userModel.findOne({
        id_number: authenticateUserDto.username,
      });
      if (!userSearch)
        throw new NotFoundException(
          'No user was found with the following credentials',
        );
      const credential = await this.credentialModel.findById(
        userSearch.credential,
      );
      const passwordVerify = await argon2.verify(
        credential.salted_password,
        authenticateUserDto.password,
      );
      if (!passwordVerify)
        throw new ForbiddenException(
          'Invalid credentials provided. Try again.',
        );
      const jwtToken = await this.jwtModule.signAsync({
        sub: userSearch.id,
        first_name: userSearch.first_name,
        last_name: userSearch.last_name,
        role: userSearch.role,
      });
      return {
        access_token: jwtToken,
      };
    }
    const credentialSearch = await this.credentialModel.findOne({
      user_name: authenticateUserDto.username,
    });
    if (!credentialSearch)
      throw new NotFoundException(
        'No credentials was found with the given credentials, did user register one?',
      );
    const userSearch = await this.userModel.findOne({
      credential: credentialSearch.id,
    });
    if (!userSearch)
      throw new NotFoundException(
        'No user was found with the following credentials',
      );
    const jwtToken = await this.jwtModule.signAsync({
      sub: userSearch.id,
      first_name: userSearch.first_name,
      last_name: userSearch.last_name,
      role: userSearch.role,
    });
    return {
      access_token: jwtToken,
    };
  }
  async authenticate_nextauth(
    authenticateUserDto: AuthenticateUserDto,
  ): Promise<object> {
    const isUsernameIdNumber = authenticateUserDto.username.match(
      /^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g,
    );
    if (isUsernameIdNumber) {
      const userRecord = await this.userModel.findOne({
        id_number: authenticateUserDto.username,
      });
      if (!userRecord)
        throw new NotFoundException(
          'No user was found with provided ID number',
        );
      const credenetial = await this.credentialModel.findById(
        userRecord.credential,
      );
      const passwordVerify = await argon2.verify(
        credenetial.salted_password,
        authenticateUserDto.password,
      );
      if (!passwordVerify)
        throw new UnauthorizedException('Invalid credentials provided.');
      return userRecord;
    } else {
      const credentialSearch = await this.credentialModel.findOne({
        user_name: authenticateUserDto.username,
      });
      if (!credentialSearch)
        throw new NotFoundException(
          'No user was found with the provided username',
        );
      const passwordVerify = await argon2.verify(
        credentialSearch.salted_password,
        authenticateUserDto.password,
      );
      if (!passwordVerify)
        throw new UnauthorizedException('Invalid credentials provided.');
      return await this.userModel.findById(credentialSearch.linked_record);
    }
  }

  resetPassword() {}

  showUsername() {}

  addMFA() {}

  removeMFA() {}

  async getUserThruHeaders(user_id: string): Promise<User> {
    const userObj = await this.userModel
      .findById(user_id)
      .select('-credential');
    if (!userObj)
      throw new NotFoundException(
        'No user was found with provided ID. Contact Support.',
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return userObj;
  }

  async checkIfUsernameTaken(username: string): Promise<boolean> {
    const user = await this.credentialModel.findOne({ user_name: username });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
