import {NextRequest, NextResponse} from 'next/server';

const AUTH_SESSION_TOKEN = 'next-auth.session-token';

export async function GET(req: NextRequest) {
    const sessionToken = req?.cookies.get(AUTH_SESSION_TOKEN);
    const sessionTokenTwo = req?.cookies.get('__Secure-next-auth.session-token');

    return NextResponse.json({
        test: sessionToken ?? 'no token',
        testTwo: sessionTokenTwo ?? 'no token',
    });
}
