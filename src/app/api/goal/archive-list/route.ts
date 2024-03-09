import {NextRequest, NextResponse} from 'next/server';

import {getGoalsArchiveListByUid} from '@/modules/Goal/actions/getGoalsArchiveListByUid';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid') as string;

    const data = await getGoalsArchiveListByUid(uid);

    return NextResponse.json({data});
}
