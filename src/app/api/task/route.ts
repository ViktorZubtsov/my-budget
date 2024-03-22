import {NextRequest, NextResponse} from 'next/server';

import {addTask, ICreateTaskParams} from '@/modules/Task/actions/addTask';
import {checkedTask, IDeleteTaskParams} from '@/modules/Task/actions/checkedTask';
import {deleteTask} from '@/modules/Task/actions/deleteTask';
import {getAllTasksForGoal} from '@/modules/Task/actions/getAllTasksForGoal';
import {ITaskUpdateParams, updateTask} from '@/modules/Task/actions/updateTask';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const goalId = searchParams.get('goalId') as string;

    const data = await getAllTasksForGoal({goalId});

    return NextResponse.json({data});
}

export async function PATCH(request: NextRequest) {
    const {taskId, isDone} = (await request.json()) as IDeleteTaskParams;

    const data = await checkedTask({isDone, taskId});

    return NextResponse.json({data});
}

export async function PUT(request: NextRequest) {
    const {taskId, task} = (await request.json()) as ITaskUpdateParams;

    const data = await updateTask({task, taskId});

    return NextResponse.json({data});
}

export async function DELETE(request: NextRequest) {
    const {taskId} = (await request.json()) as IDeleteTaskParams;

    const data = await deleteTask({taskId});

    return NextResponse.json({data});
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const goalId = searchParams.get('goalId') as string;
    const {task} = (await request.json()) as {task: ICreateTaskParams['task']};

    const data = await addTask({goalId, task});

    return NextResponse.json({data});
}
