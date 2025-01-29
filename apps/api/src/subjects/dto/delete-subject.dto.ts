import { IsMongoId, IsNotEmpty } from "class-validator";

export class DelSubjDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}