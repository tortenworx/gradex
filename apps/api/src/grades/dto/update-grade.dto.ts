import { IsArray } from "class-validator";
import { User } from "src/schemas/user.schema";

export class UpdateGradesDto {
    @IsArray()
    records: [
        _id: string,
        avg: string,
        user: User
    ]
}