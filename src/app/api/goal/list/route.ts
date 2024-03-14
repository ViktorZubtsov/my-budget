import {NextRequest, NextResponse} from 'next/server';

import {addGoalToUser, IAddGoalToUserParams} from '@/modules/Goal/actions/addGoalToUser';
import {getGoalsListByUid} from '@/modules/Goal/actions/getGoalsListByUid';
import {removeGoalById} from '@/modules/Goal/actions/removeGoalById';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get('uid') as string;

    const data = await getGoalsListByUid(uid);

    return NextResponse.json({data});
}
export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const {goalId, goal} = await request.json();
    const uid = searchParams.get('uid') as string;

    await removeGoalById({
        goal,
        goalId,
        uid,
    });

    return NextResponse.json({});
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const {goal} = (await request.json()) as {goal: IAddGoalToUserParams['goal']};
    const uid = searchParams.get('uid') as string;

    await addGoalToUser({
        goal,
        uid,
    });

    return NextResponse.json({});
}
