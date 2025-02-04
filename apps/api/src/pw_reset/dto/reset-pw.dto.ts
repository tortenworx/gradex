import { IsMongoId, IsNotEmpty, MinLength } from "class-validator";

export class PwResetDto {
    @IsNotEmpty()
    @IsMongoId()
    id: string;

    @IsNotEmpty()
    @MinLength(8)
    new_password: string;
}
