import {NextRequest, NextResponse} from 'next/server';

import {getAllArchiveTasksForGoal} from '@/modules/Task/actions/getAllArchiveTasksForGoal';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const goalId = searchParams.get('goalId') as string;

    const data = await getAllArchiveTasksForGoal({goalId});

    return NextResponse.json({data});
}
