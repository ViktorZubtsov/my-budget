import {NextRequest, NextResponse} from 'next/server';

import {getArchiveGoalById} from '@/modules/Goal/actions/getArchiveGoalById';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid') as string;
    const goalId = searchParams.get('goalId') as string;

    const data = await getArchiveGoalById({goalId, uid});

    return NextResponse.json({data});
}
