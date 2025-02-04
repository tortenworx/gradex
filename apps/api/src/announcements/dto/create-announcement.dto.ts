import { IsNotEmpty, IsOptional, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateAnnouncementDto {
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    title: string;
    @IsNotEmpty()
    @MaxLength(180)
    description: string;
    @IsOptional()
    @IsUrl()
    login_image: string;
    @IsNotEmpty()
    @MaxLength(255)
    content: string;
}
