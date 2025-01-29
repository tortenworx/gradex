import { OmitType, PartialType } from "@nestjs/mapped-types";
import { SubjectDto } from "./subject.dto";

export class NewSubjectDto extends OmitType(SubjectDto, ['teacher'] as const) {};