import {render} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {ErrorField} from '@/components/Field/Error/index';

const TEST_VALUE = 'Список пуст';

describe('ErrorField', () => {
    const {getByText} = render(<ErrorField text={TEST_VALUE} />);

    test('Render text', async () => {
        expect(getByText(TEST_VALUE));
    });
});
