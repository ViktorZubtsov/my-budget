import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {ResizeObserver} from '@/helpers';
import {MOCK_GOAL} from '@/mock';
import {GoalElement} from '@/modules/Goal/components/GoalItem/GoalElement';

describe('GoalElement', () => {
    global.ResizeObserver = ResizeObserver;
    const {getByText} = render(<GoalElement name={MOCK_GOAL.name} description={MOCK_GOAL.description} />);

    test('Check Text Value', () => {
        expect(getByText(MOCK_GOAL.name).textContent).toBe(MOCK_GOAL.name);
        expect(getByText(MOCK_GOAL.description).textContent).toBe(MOCK_GOAL.description);
    });
});
