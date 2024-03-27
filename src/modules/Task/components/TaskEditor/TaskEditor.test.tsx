import {fireEvent, render} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import {describe, expect, test, vi} from 'vitest';

import {TEST_ID_ACCOUNT, TEST_ID_ADD_TASK} from '@/constant/dataTest';
import {generateAccount, generateWord, ResizeObserver} from '@/helpers';
import {MOCK_ACCOUNT, MOCK_TASK} from '@/mock';
import {TaskEditor} from '@/modules/Task/components/TaskEditor/index';

const DEFAULT_TASK = {
    bankAccount: MOCK_TASK['bankAccount'],
    name: MOCK_TASK['name'],
    price: MOCK_TASK['price'],
};
export const SAVE_TEXT = 'Сохранить';
export const NAME = 'NAME';
export const PRICE = 500;

describe('TaskEditor', () => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;
    global.ResizeObserver = ResizeObserver;

    const {getByTestId, rerender} = render(
        <TaskEditor
            accountsList={[]}
            isOpen={true}
            onClose={() => {}}
            title={''}
            isFetching={false}
            isAccountsFetching={false}
            addAccount={() => {}}
            isEdit={false}
            onSubmit={() => {}}
        />
    );

    const nameField = getByTestId(TEST_ID_ADD_TASK.NAME) as HTMLInputElement;
    const priceField = getByTestId(TEST_ID_ADD_TASK.PRICE) as HTMLInputElement;
    const button = getByTestId(TEST_ID_ADD_TASK.SUBMIT);

    test('Check Edit mode', async () => {
        const handleClick = vi.fn();
        rerender(
            <TaskEditor
                accountsList={[MOCK_ACCOUNT]}
                defaultValues={DEFAULT_TASK}
                isOpen={true}
                onClose={() => {}}
                title={''}
                isFetching={false}
                isAccountsFetching={false}
                addAccount={() => {}}
                isEdit={true}
                onSubmit={handleClick}
            />
        );
        const accountField = getByTestId(TEST_ID_ACCOUNT.SELECT);

        expect(nameField.value).toBe(DEFAULT_TASK.name);
        expect(priceField.value).toBe(String(DEFAULT_TASK.price));
        expect(accountField.textContent).toBe(MOCK_ACCOUNT.name);
        expect(button.textContent).toBe(SAVE_TEXT);

        fireEvent.change(nameField, {target: {value: NAME}});
        fireEvent.change(priceField, {target: {value: PRICE}});

        await act(async () => {
            fireEvent.click(button);
        });

        expect(handleClick).toHaveBeenCalledWith({
            bankAccount: DEFAULT_TASK.bankAccount,
            name: NAME,
            price: PRICE,
        });
    });
});
