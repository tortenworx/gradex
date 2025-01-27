import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { GradeReport } from "./grade-repoort.dto";

// export class NewUserCredentialsDto extends OmitType(Ga, [
//   'user_id',
// ] as const) {}

// export class NewUserDto extends IntersectionType(
//   GradeReport,
//   PartialType(NewUserCredentialsDto),
// ) {}


export class CreateReportDto extends PickType(GradeReport, ['semester', 'status', 'type', 'subject'] as const) {}

