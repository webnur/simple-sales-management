import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname;
    const isPublicUrl=path==='/sign-in'||path==='/signup';
    // const token= request.cookies.get('token')?.value||"";
    const token= await getToken({req:request})
    if(!token && path==="/dashboard"){
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    // if(!isPublicUrl && !token){
    //     return NextResponse.redirect(new URL('/sign-in', request.url))
    // }

    if(isPublicUrl && token){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/signup",
    "/dashboard"
  ],
}