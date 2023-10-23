import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const res = NextResponse.next();

    const session: any = await request.cookies.get('token');

    if(!session){
        return NextResponse.redirect(new URL('/unauthorized', request.url)) // redirect to /unauthorized page
    }
    
    const { user } = session;
    console.log("from middleware", { user });

    if (user?.admin !== "true") {
        // unauthorized to see pages inside admin/
        return NextResponse.redirect(new URL('/unauthorized', request.url)) // redirect to /unauthorized page
    }
    
    return res;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico).*)', '/admin*']
}