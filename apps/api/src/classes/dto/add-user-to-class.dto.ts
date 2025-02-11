import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddUserToClassDto {
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  user_id: ObjectId[];
  @IsMongoId()
  @IsNotEmpty()
  for_class: string;
}
