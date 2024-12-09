import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @IsNotEmpty()
  new_password: string;
}
