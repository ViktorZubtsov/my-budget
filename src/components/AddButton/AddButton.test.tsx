import {fireEvent, render} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {AddButton} from '@/components/AddButton/index';
import {TEST_ID_GOAL} from '@/constant/dataTest';
const handleClick = vi.fn();

describe('AddButton', () => {
    const {getByTestId} = render(<AddButton onClick={handleClick} />);
    const button = getByTestId(TEST_ID_GOAL.ADD_GOAL);

    test('on click', () => {
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalled();
    });
});
