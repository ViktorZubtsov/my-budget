import {IGoal, IGoalShort} from '@/model';

export const goalDataTransform = (list: IGoalShort[]) => {
    if (list.length) {
        return list[0];
    }

    return {
        description: '',
        id: '',
        name: '',
    };
};
