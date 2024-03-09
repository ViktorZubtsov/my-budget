import {NextRequest, NextResponse} from 'next/server';

import {getGoalsListByUid} from '@/modules/Goal/actions/getGoalsListByUid';
import {removeGoalById} from '@/modules/Goal/actions/removeGoalById';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid') as string;

    const data = await getGoalsListByUid(uid);

    return NextResponse.json({data});
}
export async function DELETE(request: NextRequest): Promise<typeof NextResponse> {
    const searchParams = request.nextUrl.searchParams;
    const {goalId, goal} = await request.json();
    const uid = searchParams.get('uid') as string;

    await removeGoalById({
        goal,
        goalId,
        uid,
    });

    return NextResponse;
}
