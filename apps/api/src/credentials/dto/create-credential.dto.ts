import {
  IsAlphanumeric,
  IsMongoId,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateCredentialDto {
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
