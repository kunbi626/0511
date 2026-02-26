import { NextResponse } from 'next/server';

const POST = () => {
    const token = Date.now();
    const response = NextResponse.json({});
    response.cookies.set('token', `${token}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/',
        sameSite: 'lax'
    });
    return response;
};

export { POST };
