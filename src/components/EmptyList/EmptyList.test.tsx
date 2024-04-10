import {render} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {EmptyList} from '@/components/EmptyList/index';

const TEST_VALUE = 'Список пуст';

describe('EmptyList', () => {
    const {getByText} = render(<EmptyList text={TEST_VALUE} />);

    test('Renders the title', async () => {
        expect(getByText(TEST_VALUE));
    });
});
