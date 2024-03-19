import {fireEvent, render} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {generateAccount, generateWord, ResizeObserver} from '@/helpers';
import {ACCOUNTS_OPTIONS} from '@/modules/Settings/components/AddAccount/constants';
import {AddAccount} from '@/modules/Settings/components/AddAccount/index';
import {MAX_ACCOUNT_LENGTH, MAX_ACCOUNT_NAME_LENGTH} from '@/modules/Settings/constants';

const TEST_VALUE = generateWord(10);
const LIMIT = MAX_ACCOUNT_NAME_LENGTH + 1;
const TEST_LONG_VALUE = generateWord(LIMIT);
const ACCOUNT = ACCOUNTS_OPTIONS[0];
const ACCOUNT_LIST = generateAccount(MAX_ACCOUNT_LENGTH);

const handleClick = vi.fn();
const component = <AddAccount accountsList={[]} onClick={handleClick} isFetching={false} />;

describe('AddAccount', () => {
    global.ResizeObserver = ResizeObserver;
    const {getByLabelText, getByText, rerender, findAllByText} = render(component);
    const item = getByLabelText('Название счета') as HTMLInputElement;
    const btn = getByText('Добавить');
    const selectItem = getByText(ACCOUNT.text);

    test('Check default click', () => {
        fireEvent.click(btn);
        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check empty color', () => {
        fireEvent.change(item, {target: {value: TEST_VALUE}});
        fireEvent.click(btn);
        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check empty input', () => {
        fireEvent.click(selectItem);
        fireEvent.change(item, {target: {value: ''}});
        fireEvent.click(btn);

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check long name', () => {
        fireEvent.change(item, {target: {value: TEST_LONG_VALUE}});
        fireEvent.click(selectItem);
        fireEvent.click(btn);

        expect(item.value.length).toBe(LIMIT);
        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check success case', () => {
        fireEvent.change(item, {target: {value: TEST_VALUE}});
        fireEvent.click(selectItem);
        fireEvent.click(btn);

        expect(handleClick).toHaveBeenCalledWith({
            colorCode: ACCOUNT.value,
            name: TEST_VALUE,
        });
    });

    test('Check accounts list', () => {
        const handleSubmit = vi.fn();

        rerender(<AddAccount accountsList={ACCOUNT_LIST} onClick={handleSubmit} isFetching={false} />);
        fireEvent.click(btn);

        expect(handleSubmit).not.toHaveBeenCalled();
    });
});
