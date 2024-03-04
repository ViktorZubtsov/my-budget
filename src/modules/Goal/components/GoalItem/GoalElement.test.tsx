import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {TEST_ID_GOAL_ITEM} from '@/constant/dataTest';
import {ResizeObserver} from '@/helpers';
import {MOCK_GOAL} from '@/mock';
import {GoalElement} from '@/modules/Goal/components/GoalItem/GoalElement';

const handleGoTo = vi.fn();
describe('GoalElement', () => {
    global.ResizeObserver = ResizeObserver;
    render(<GoalElement name={MOCK_GOAL.name} description={MOCK_GOAL.description} onClick={handleGoTo} />);

    test('Check Text Value', () => {
        expect(screen.getByText(MOCK_GOAL.name).textContent).toBe(MOCK_GOAL.name);
        expect(screen.getByText(MOCK_GOAL.description).textContent).toBe(MOCK_GOAL.description);
    });

    test('Check onClick', () => {
        fireEvent.click(screen.getByTestId(TEST_ID_GOAL_ITEM.GOAL_ITEM));

        expect(handleGoTo).toHaveBeenCalled();
    });
});
