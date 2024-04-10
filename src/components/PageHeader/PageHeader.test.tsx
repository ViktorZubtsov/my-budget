import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {PageHeader} from '@/components/PageHeader/index';
import {TEST_PAGE_HEADER} from '@/constant/dataTest';

const TITLE = 'Title';
const handleClick = vi.fn();
const component = <PageHeader title={TITLE} onClick={handleClick} />;

describe('PageHeader', () => {
    const {getByTestId, getByText} = render(component);

    test('Handle click', () => {
        fireEvent.click(getByTestId(TEST_PAGE_HEADER.GO_TO));

        expect(handleClick).toHaveBeenCalled();
    });

    test('Check title', () => {
        expect(getByText(TITLE));
    });
});
