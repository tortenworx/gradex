import { IsMongoId, IsNotEmpty } from "class-validator";

export class ResolvePwResetDto {
    @IsNotEmpty()
    @IsMongoId()
    id: string;
}
