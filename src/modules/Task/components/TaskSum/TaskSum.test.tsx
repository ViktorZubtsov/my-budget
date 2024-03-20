import {render} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {TEST_ID_TASK} from '@/constant/dataTest';
import {TaskSum} from '@/modules/Task/components/TaskSum/index';

const TEST_VALUE = 10_895.2356;
const TEST_UNDEFINED_VALUE = '0,00 ₽';
const TEST_SUM_VALUE = '10 895,24 ₽';
const TEST_DIGITS_VALUE = '10 895,236 ₽';

describe('TaskSum', () => {
    const {getByText, getByTestId, rerender} = render(<TaskSum sum={TEST_VALUE} />);

    test('Renders the title', async () => {
        expect(getByText('Сумма'));
    });

    test('Renders with no sum, defaulting to 0', () => {
        rerender(<TaskSum sum={undefined} />);

        expect(getByTestId(TEST_ID_TASK.TASK_SUM).textContent).toBe(TEST_UNDEFINED_VALUE);
    });

    test('With a sum', () => {
        rerender(<TaskSum sum={TEST_VALUE} />);

        expect(getByTestId(TEST_ID_TASK.TASK_SUM).textContent).toBe(TEST_SUM_VALUE);
    });

    test('With a digits', () => {
        rerender(<TaskSum sum={TEST_VALUE} digits={3} />);

        expect(getByTestId(TEST_ID_TASK.TASK_SUM).textContent).toBe(TEST_DIGITS_VALUE);
    });
});
