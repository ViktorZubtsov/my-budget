import {fireEvent, render} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {TEST_ID_COMMON, TEST_ID_TASK} from '@/constant/dataTest';
import {MOCK_ACCOUNT, MOCK_TASK} from '@/mock';
import {TTask} from '@/model';
import {TaskItem} from '@/modules/Task/components/TaskItem/index';

const TEST_MOCK_PRICE = '1 000 ₽';
const TEST_MOCK_EMPTY_PRICE = '0 ₽';
const MOCK_NOT_ACCOUNT_TEXT = 'Нет названия';

const MOCK_EMPTY_VALUE_TASK: TTask = {
    ...MOCK_TASK,
    bankAccount: 'none',
    price: 0,
};

describe('TaskItem', () => {
    const {getByText, getByTestId, rerender} = render(
        <TaskItem task={MOCK_EMPTY_VALUE_TASK} accountsList={[MOCK_ACCOUNT]} onEdit={() => {}} onRemove={() => {}} onAccept={() => {}} />
    );

    test('Check is  not found bankAccount, price 0', () => {
        expect(getByTestId(TEST_ID_TASK.TASK_ITEM_PRICE).textContent).toBe(TEST_MOCK_EMPTY_PRICE);
        expect(getByTestId(TEST_ID_TASK.TASK_ITEM_BADGE).textContent).toBe(MOCK_NOT_ACCOUNT_TEXT);
    });

    test('Check onRemove', () => {
        const onRemove = vi.fn();
        rerender(<TaskItem task={MOCK_TASK} accountsList={[]} onEdit={() => {}} onRemove={onRemove} onAccept={() => {}} />);

        fireEvent.click(getByTestId(TEST_ID_COMMON.REMOVE_BUTTON));

        expect(onRemove).toHaveBeenCalled();
        expect(onRemove).toHaveBeenCalledWith(MOCK_TASK.id);
    });

    test('Check onAccept', () => {
        const onAccept = vi.fn();

        rerender(<TaskItem task={MOCK_TASK} accountsList={[]} onEdit={() => {}} onRemove={() => {}} onAccept={onAccept} />);

        fireEvent.click(getByTestId(TEST_ID_COMMON.ACCEPT_BUTTON));

        expect(onAccept).toHaveBeenCalledWith(MOCK_TASK.id);
    });

    test('Check onEdit', () => {
        const onEdit = vi.fn();
        rerender(<TaskItem task={MOCK_TASK} accountsList={[]} onEdit={onEdit} onRemove={() => {}} onAccept={() => {}} />);

        fireEvent.click(getByTestId(TEST_ID_COMMON.EDIT_BUTTON));

        expect(onEdit).toHaveBeenCalledWith(MOCK_TASK.id);
    });

    test('Check empty  accountsList', () => {
        rerender(<TaskItem task={MOCK_TASK} accountsList={[]} onEdit={() => {}} onRemove={() => {}} onAccept={() => {}} />);

        expect(getByTestId(TEST_ID_TASK.TASK_ITEM_BADGE).textContent).toBe(MOCK_NOT_ACCOUNT_TEXT);
    });

    test('Check success name, price, account ', () => {
        rerender(<TaskItem task={MOCK_TASK} accountsList={[MOCK_ACCOUNT]} onEdit={() => {}} onRemove={() => {}} onAccept={() => {}} />);
        expect(getByText(MOCK_TASK.name));
        expect(getByTestId(TEST_ID_TASK.TASK_ITEM_PRICE).textContent).toBe(TEST_MOCK_PRICE);

        expect(getByTestId(TEST_ID_TASK.TASK_ITEM_BADGE).textContent).toBe(MOCK_ACCOUNT.name);
    });
});
