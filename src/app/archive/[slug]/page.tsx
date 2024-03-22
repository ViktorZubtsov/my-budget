import {Suspense} from 'react';

import Loading from '@/app/loading';
import {User} from '@/core/classes/User';
import {SWRProvider} from '@/core/provider/SWRProvider';
import {getGoalArchiveXKey, getTaskArchiveListKey} from '@/core/SWRKeys';
import {getArchiveGoalById} from '@/modules/Goal/actions/getArchiveGoalById';
import {GoalArchiveX} from '@/modules/Goal/page/GoalArchiveX';
import {getAllArchiveTasksForGoal} from '@/modules/Task/actions/getAllArchiveTasksForGoal';

const GoalArchiveXPage = async ({params}: {params: {slug: string}}) => {
    const uid = new User(null).getUid();
    const goalId = params.slug;
    const goal = await getArchiveGoalById({goalId, uid});
    const archiveTasksList = await getAllArchiveTasksForGoal({goalId});

    return (
        <Suspense fallback={<Loading />}>
            <SWRProvider
                fallback={{
                    [`${getGoalArchiveXKey(uid, goalId)}`]: goal,
                    [`${getTaskArchiveListKey(goalId)}`]: archiveTasksList,
                }}
            >
                <GoalArchiveX goalId={goalId} />
            </SWRProvider>
        </Suspense>
    );
};

export default GoalArchiveXPage;
