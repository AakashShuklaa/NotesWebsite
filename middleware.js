import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
    const tokenObj = req.cookies.get('token');
    const token = tokenObj.value;

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
        // console.log('User ID:', payload.id);
        // console.log('User Email:', payload.email);
        return NextResponse.next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/profile'],
};
