import {fireEvent, render} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import Delete from '@/components/TrailingActions/Delete/index';
import {TEST_ID_COMMON} from '@/constant/dataTest';

const handleClick = vi.fn();

describe('TrailingActionsDelete', () => {
    const {getByTestId} = render(<Delete onClick={handleClick} />);

    test('on remove', () => {
        fireEvent.click(getByTestId(TEST_ID_COMMON.REMOVE_BUTTON));

        expect(handleClick).toHaveBeenCalled();
    });
});
