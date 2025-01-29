import { IsMongoId, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

interface SubjectLinks {
  name: string;
  link: string;
}

export class SubjectDto {
    @IsNotEmpty()
    @IsMongoId()
    teacher: string;
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(256)
    name: string;
    @IsNotEmpty()
    code: string;
    @IsOptional()
    @MaxLength(800)
    description: string;
    @IsOptional()
    links: [SubjectLinks];
}