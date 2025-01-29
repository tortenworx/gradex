import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UserAttachDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
    @IsOptional()
    attachAs: "student" | "teacher"
}