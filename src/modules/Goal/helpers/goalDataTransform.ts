import {IGoal} from '@/model';

export const goalDataTransform = (list: IGoal[]) => {
    if (list.length) {
        return list[0];
    }

    return {
        description: '',
        id: '',
        name: '',
    };
};
