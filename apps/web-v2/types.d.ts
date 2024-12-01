import { type DefaultSession } from "next-auth"
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultSession["user"] {
    id: string,
    id_number: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    mobile_number: number,
    personal_email_address: string,
    educational_email_address: string,
    gender: string,
    role: string,
    accessToken: string,
  }
}