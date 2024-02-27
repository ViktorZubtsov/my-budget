import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {ResizeObserver} from '@/helpers';
import {AddAccount} from '@/modules/Settings/components/AddAccount/index';
import {MAX_ACCOUNT_NAME_LENGTH} from '@/modules/Settings/constants';

const TEST_VALUE = 'TEST_VALUE';
const TEST_LONG_VALUE = 'EST_VALUETEST_VALUETsssEST_VALU';

const handleClick = vi.fn();
const component = <AddAccount accountsList={[]} onClick={handleClick} isFetching={false} />;

describe('AddAccount', () => {
    global.ResizeObserver = ResizeObserver;
    render(component);
    const item = screen.getByLabelText('Название счета') as HTMLInputElement;
    const btn = screen.getByText('Добавить');
    const selectItem = screen.getByText('Красный');

    test('Check default click', () => {
        fireEvent.click(btn);
        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check empty color', () => {
        fireEvent.change(item, {target: {value: TEST_VALUE}});

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check empty input', () => {
        fireEvent.click(selectItem);
        fireEvent.change(item, {target: {value: ''}});

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check long name', () => {
        fireEvent.change(item, {target: {value: TEST_LONG_VALUE}});
        fireEvent.click(selectItem);
        fireEvent.click(btn);
        expect(item.value.length).toBe(MAX_ACCOUNT_NAME_LENGTH + 1);
        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check success case', () => {
        fireEvent.change(item, {target: {value: TEST_VALUE}});
        fireEvent.click(selectItem);
        fireEvent.click(btn);
        expect(handleClick).toHaveBeenCalled();
    });
});
