import {NextRequest, NextResponse} from 'next/server';

import {getGoalsListByUid} from '@/modules/Goal/actions/getGoalsListByUid';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid') as string;

    const data = await getGoalsListByUid(uid);

    return NextResponse.json({data});
}
