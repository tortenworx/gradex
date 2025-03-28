import { OmitType, PartialType } from "@nestjs/mapped-types";
import { SubjectDto } from "./subject.dto";

export class EditSubjectDto extends PartialType(SubjectDto) {};