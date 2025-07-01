import type { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { getUserById } from "@/lib/user";
import db from "@/lib/db";


export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials:{
                username: {label: "Usename" , type:"text"},
                password: {label: "Password" , type:"password"}
            },
            async authorize(credentials){
                if (!credentials) return null;
                const [rows]: any = await db.execute("SELECT * FROM emp WHERE username = ? LIMIT 1",
                    [credentials?.username]
                );

                const user = rows[0]

                if(!user) return null;

                const isValidPassword = credentials?.password === user.password;

                if(!isValidPassword) return null;

                return{
                    id : user.id,
                    emp_id : user.emp_id,
                    emp_fname : user.emp_fname,
                    emp_sname : user.emp_sname,
                    emp_level : user.emp_level,
                    emp_avatar : user.avatar,
                    emp_email: user.emp_email,
                    emp_position: user.emp_position,
                    emp_tel: user.emp_tel,
                    emp_startwork: user.emp_startwork,
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id ? Number(user.id) : undefined;;
            token.emp_id = user.emp_id;
            token.emp_fname = user.emp_fname;
            token.emp_sname = user.emp_sname;
            token.emp_level = user.emp_level;
            token.emp_avatar = user.emp_avatar;
            token.emp_email = user.emp_email;
            token.emp_position = user.emp_position;
            token.emp_tel = user.emp_tel;
            token.emp_startwork = user.emp_startwork;
        }else if(token.id){
            const freshUser = await getUserById(token.id);

            if(freshUser){
                token.emp_id = freshUser.emp_id;
                token.emp_fname = freshUser.emp_fname;
                token.emp_sname = freshUser.emp_sname;
                token.emp_level = freshUser.emp_level;
                token.emp_avatar = freshUser.emp_avatar;
                token.emp_email = freshUser.emp_email;
                token.emp_position = freshUser.emp_position;
                token.emp_tel = freshUser.emp_tel;
                token.emp_startwork = freshUser.emp_startwork;
            }
        }

        return token;
    },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.emp_id = token.emp_id;
            session.user.emp_fname = token.emp_fname;
            session.user.emp_sname = token.emp_sname;
            session.user.emp_level = token.emp_level;
            session.user.emp_avatar = token.emp_avatar;
            session.user.emp_email = token.emp_email;
            session.user.emp_position = token.emp_position;
            session.user.emp_tel = token.emp_tel;
            session.user.emp_startwork = token.emp_startwork;
      
            return session;
        }
    },
    pages: {
        signIn: "/",
        error: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
}