import type UserRecord from "./User";

export default interface Class {
    _id: string;
    teacher: UserRecord;
    name: string;
    code: string;
    description: string;
    links: { name: string; link: string; }[];
    student: UserRecord[]
}