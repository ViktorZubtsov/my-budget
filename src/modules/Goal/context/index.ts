import {createContext} from 'react';

import {IGoalShort} from '@/model';

export const GoalContext = createContext<IGoalShort>({
    id: '',
    description: '',
    name: '',
});
