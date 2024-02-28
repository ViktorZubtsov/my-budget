import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {PageHeader} from '@/components/PageHeader/index';
import {TEST_PAGE_HEADER} from '@/constant/dataTest';
const TITLE = 'Title';
const handleClick = vi.fn();
const component = <PageHeader title={TITLE} onClick={handleClick} />;

describe('PageHeader', () => {
    test('Render Title', () => {
        render(component);
        expect(screen.getByText(TITLE));
    });

    test('Handle click', () => {
        render(component);
        const ddd = document.getElementById(TEST_PAGE_HEADER.GO_TO);

        if (ddd) {
            fireEvent.click(ddd);
        }

        expect(handleClick).toHaveBeenCalled();
    });
});
