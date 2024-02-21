import {redirect} from 'next/navigation';
import {Suspense} from 'react';

import Index from '../../../../components/Loading';
import {$Auth} from '../../../../core/classes/Auth';
import {User} from '../../../../core/classes/User';
import {NotFoundControllerException} from '../../../../core/exceptions/NotFoundControllerException';
import {getGoalById} from '../../actions/getGoalById';
import {GoalXHeader} from '../../components/GoalXHeader';
import {GoalXListing} from '../../components/GoalXListing';
import {getAccountsList} from '../../../Settings/actions/getAccountsList';
import {getAllTasksForGoal} from '../../../Task/actions/getAllTasksForGoal';

export const GoalXPage = async ({slug}: {slug: string}) => {
    const uid = '';

    if ('') {
        return redirect('/auth');
    }
    const [goal] = await getGoalById({goalId: slug, uid});
    const taskList = await getAllTasksForGoal({goalId: slug});
    const accountsList = await getAccountsList({uid});
    if (!goal) {
        throw new NotFoundControllerException('Not found');
    }
    return (
        <div>
            <Suspense fallback={<Index />}>
                <GoalXHeader goal={goal} />
            </Suspense>
            <Suspense fallback={<Index />}>
                <GoalXListing taskList={taskList} accountsList={accountsList} />
            </Suspense>
        </div>
    );
};
