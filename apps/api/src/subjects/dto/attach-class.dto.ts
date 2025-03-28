import { IsMongoId, IsNotEmpty } from "class-validator";

export class AttachClassDto { 
    @IsNotEmpty()
    @IsMongoId()
    class: string;
    @IsNotEmpty()
    @IsMongoId()
    subject: string;
}