import type UserRecord from "./User";

export default class Class {
    public constructor(
        _id: string,
        teacher: UserRecord,
        name: string,
        code: string,
        description: string,
        links: { name: string; link: string; }[],
        students: UserRecord[]
    ) {
        this._id = _id;
        this.teacher = teacher;
        this.name = name;
        this.code = code;
        this.description = description;
        this.links = links;
        this.students = students
    }
    _id: string;
    teacher: UserRecord;
    name: string;
    code: string;
    description: string;
    links: { name: string; link: string; }[];
    students: UserRecord[]
}