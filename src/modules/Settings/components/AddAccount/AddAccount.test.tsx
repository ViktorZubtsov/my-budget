import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {ResizeObserver} from '@/helpers';
import {AddAccount} from '@/modules/Settings/components/AddAccount/index';

const TEST_VALUE = 'TEST_VALUE';

const handleClick = vi.fn();
const component = <AddAccount accountsList={[]} onClick={handleClick} isFetching={false} />;

describe('AddAccount', () => {
    global.ResizeObserver = ResizeObserver;

    test('Check input Value', () => {
        render(component);
        const item = screen.getByLabelText('Название счета') as HTMLInputElement;

        fireEvent.change(item, {target: {value: TEST_VALUE}});

        expect(item.value).toBe(TEST_VALUE);
    });
    // test('Check click', () => {
    //     render(component);
    //     const btn = screen.getByText('Добавить');
    //
    //     fireEvent.click(btn);
    //
    //     expect(handleClick).toHaveBeenCalled();
    // });

    // test('Handle click', () => {
    //     render(component);
    //     const ddd = document.getElementById(TEST_PAGE_HEADER.GO_TO);
    //
    //     if (ddd) {
    //         fireEvent.click(ddd);
    //     }
    //
    //     expect(handleClick).toHaveBeenCalled();
    // });
});
