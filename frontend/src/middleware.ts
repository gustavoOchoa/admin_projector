import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwtDecode from 'jwt-decode';

type tokenType = {
    uuid: number
    email: string
    role: string
    iat: number
    exp: number
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const res = NextResponse.next();

    const session: any = await request.cookies.get('access_token');
    let token:tokenType = jwtDecode(session.value);
    if(!token){
        return NextResponse.redirect(new URL('/unauthorized', request.url)) // redirect to /unauthorized page
    }

    const { uuid, email, iat, exp, role } = token;

    if (role !== "admin") {
        // unauthorized to see pages inside admin/
        return NextResponse.redirect(new URL('/unauthorized', request.url)) // redirect to /unauthorized page
    }
    
    return res;
}

export const config = {
    matcher: '/admin/:path*'
}