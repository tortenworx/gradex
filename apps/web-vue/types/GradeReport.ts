import type { Gender } from "./User"

type Nullable<T> = T | null;

export interface GradeReport {
    _id: string,
    status: "PUBLISHED" | "EDITING" | "REVIWEING",
    type: "SHS" | "COLLEGE"
    records: GradeRecord[],
    subject: {
        name: string,
        linked_class: {
            class_name: string,
            _id: string
        }
    }
    createdAt: string
}

export interface GradeRecord {
    grade: any
    _id: string;
    user: {
        _id: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        gender: Gender;
    };
    avg: [Nullable<number>, Nullable<number>]
}