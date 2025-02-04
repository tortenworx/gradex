import { IsNotEmpty } from "class-validator";

export class CreatePwResetDto {
    @IsNotEmpty()
    username: string;
}
