import {ReactNode} from 'react';

import {IGoalShort} from '@/model';
import {GoalContext} from '@/modules/Goal/context';

export const GoalProvider = ({children, goal}: {children: ReactNode; goal: IGoalShort}) => {
    return <GoalContext.Provider value={goal}>{children}</GoalContext.Provider>;
};
