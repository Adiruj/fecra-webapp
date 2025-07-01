import NextAuth , {DefaultSession , DefaultUser} from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number;
      emp_id?: string;
      emp_fname?: string;
      emp_sname?: string;
      emp_level?: string;
      emp_position?: string;
      emp_email?: string;
      emp_tel?: string;
      emp_startwork?: Date;
      emp_avatar?: string;
      
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: number;
    emp_id?: string;
    emp_fname?: string;
    emp_sname?: string;
    emp_level?: string;
    emp_position?: string;
    emp_email?: string;
    emp_tel?: string;
    emp_startwork?: Date;
    emp_avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    emp_id?: string;
    emp_fname?: string;
    emp_sname?: string;
    emp_level?: string;
    emp_position?: string;
    emp_email?: string;
    emp_tel?: string;
    emp_startwork?: Date;
    emp_avatar?: string;
  }
}

