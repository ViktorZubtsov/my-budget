import {Suspense} from 'react';

import Loading from '@/app/loading';
import {User} from '@/core/classes/User';
import {SWRProvider} from '@/core/provider/SWRProvider';
import {getGoalXKey} from '@/core/SWRKeys';
import {getGoalById} from '@/modules/Goal/actions/getGoalById';
import {goalDataTransform} from '@/modules/Goal/helpers/goalDataTransform';

const GoalX = async ({params}: {params: {slug: string}}) => {
    const uid = new User(null).getUid();
    const goalId = params.slug;
    const goal = await getGoalById({goalId, uid});

    return (
        <Suspense fallback={<Loading />}>
            <SWRProvider
                fallback={{
                    [`${getGoalXKey(uid, goalId)}`]: goalDataTransform(goal),
                }}
            >
                <div>sde</div>
            </SWRProvider>
        </Suspense>
    );
};

export default GoalX;
