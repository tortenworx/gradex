import type UserRecord from "./User";

export default class Class {
    id!: string;
    teacher!: UserRecord;
    name!: string;
    code!: string;
    description!: string;
    links!: { name: string; link: string; }[];
}