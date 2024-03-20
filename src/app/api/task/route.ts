import {NextRequest, NextResponse} from 'next/server';

import {getAllTasksForGoal} from '@/modules/Task/actions/getAllTasksForGoal';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const goalId = searchParams.get('goalId') as string;

    const data = await getAllTasksForGoal({goalId});

    return NextResponse.json({data});
}
