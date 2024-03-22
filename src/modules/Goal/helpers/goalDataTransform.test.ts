import {describe, expect, test} from 'vitest';

import {IGoalShort} from '@/model';
import {goalDataTransform} from '@/modules/Goal/helpers/goalDataTransform';

describe('goalDataTransform', () => {
    test('should return a default object if the list is empty', () => {
        const list = [] as IGoalShort[];

        const result = goalDataTransform(list);

        expect(result).toEqual({
            description: '',
            id: '',
            name: '',
        });
    });

    test('should return the first element of the list if it is not empty', () => {
        const list = [
            {description: 'Goal 1', id: '1', name: 'Goal 1 Name'},
            {description: 'Goal 2', id: '2', name: 'Goal 2 Name'},
        ];
        const result = goalDataTransform(list);

        expect(result).toEqual(list[0]);
    });
});
