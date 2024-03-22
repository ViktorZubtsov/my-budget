import {NextRequest, NextResponse} from 'next/server';

import {getGoalById} from '@/modules/Goal/actions/getGoalById';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid') as string;
    const goalId = searchParams.get('goalId') as string;

    const data = await getGoalById({goalId, uid});

    return NextResponse.json({data});
}
