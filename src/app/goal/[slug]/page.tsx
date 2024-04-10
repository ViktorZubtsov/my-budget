import {Suspense} from 'react';

import Loading from '@/app/loading';
import {$Auth} from '@/core/classes/Auth';
import {User} from '@/core/classes/User';
import {SWRProvider} from '@/core/provider/SWRProvider';
import {getGoalXKey, getTaskListKey} from '@/core/SWRKeys';
import {getGoalById} from '@/modules/Goal/actions/getGoalById';
import {GoalXPage} from '@/modules/Goal/page/GoalX';
import {getAllTasksForGoal} from '@/modules/Task/actions/getAllTasksForGoal';

const GoalX = async ({params}: {params: {slug: string}}) => {
    const session = await $Auth.getSession();
    const uid = new User(session).getUid();
    const goalId = params.slug;
    const goal = await getGoalById({goalId, uid});
    const taskList = await getAllTasksForGoal({goalId});

    return (
        <Suspense fallback={<Loading />}>
            <SWRProvider
                fallback={{
                    [`${getGoalXKey(uid, goalId)}`]: goal,
                    [`${getTaskListKey(goalId)}`]: taskList,
                }}
            >
                <GoalXPage goalId={goalId} />
            </SWRProvider>
        </Suspense>
    );
};

export default GoalX;
