import { getToken } from "next-auth/jwt";
import { NextResponse , NextRequest } from "next/server";

export async function middleware(request:NextRequest) {
    const token = await getToken({req:request , secret: process.env.NEXTAUTH_SECRET})
    const isAuthPage = request.nextUrl.pathname.startsWith('/signin')

    if(token && isAuthPage){
        return NextResponse.redirect(new URL('/',request.url))
    }

    if(!token && !isAuthPage && request.nextUrl.pathname.startsWith('/user')){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/signin','/user']
}