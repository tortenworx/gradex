export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export enum Role {
  USER = 'USER',
  FACULTY = 'FACULTY',
  SUPERADMIN = 'SUPERADMIN',
}

export default interface UserRecord {
  id: string;
  id_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_number: number;
  educational_email_address: string;
  personal_email_address: string;
  gender: Gender;
  role: Role;
}