import {NextRequest, NextResponse} from 'next/server';

import {checkedTask, IDeleteTaskParams} from '@/modules/Task/actions/checkedTask';
import {getAllTasksForGoal} from '@/modules/Task/actions/getAllTasksForGoal';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const goalId = searchParams.get('goalId') as string;

    const data = await getAllTasksForGoal({goalId});

    return NextResponse.json({data});
}

export async function PATCH(request: NextRequest) {
    const {taskId, isDone} = (await request.json()) as IDeleteTaskParams;

    const data = checkedTask({isDone, taskId});

    return NextResponse.json({data});
}
