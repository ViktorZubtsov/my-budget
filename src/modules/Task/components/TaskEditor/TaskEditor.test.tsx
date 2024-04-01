import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import {describe, expect, test, vi} from 'vitest';

import {TEST_ID_ACCOUNT, TEST_ID_ADD_TASK} from '@/constant/dataTest';
import {generateWord, ResizeObserver} from '@/helpers';
import {MOCK_ACCOUNT, MOCK_ACCOUNT_LIST, MOCK_ACCOUNT_TWO, MOCK_TASK} from '@/mock';
import {ACCOUNTS_OPTIONS} from '@/modules/Settings/components/AddAccount/constants';
import {TaskEditor} from '@/modules/Task/components/TaskEditor/index';
import {TASK_ERROR, TASK_MAX_LENGTH, TASK_MAX_PRICE, TASK_MIN_LENGTH} from '@/modules/Task/constants';

const ACCOUNT = ACCOUNTS_OPTIONS[0];

const DEFAULT_TASK = {
    bankAccount: MOCK_TASK['bankAccount'],
    name: MOCK_TASK['name'],
    price: MOCK_TASK['price'],
};
export const SAVE_TEXT = 'Сохранить';
export const ADD_TASK_TEXT = 'Добавить';
export const NAME = 'NAME';
export const PRICE = 500;

// eslint-disable-next-line max-lines-per-function
describe('TaskEditor', () => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;
    global.ResizeObserver = ResizeObserver;

    const {rerender} = render(
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

    const nameField = screen.getByTestId(TEST_ID_ADD_TASK.NAME) as HTMLInputElement;
    const priceField = screen.getByTestId(TEST_ID_ADD_TASK.PRICE) as HTMLInputElement;
    const button = screen.getByTestId(TEST_ID_ADD_TASK.SUBMIT);

    test('Check Edit mode', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
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
        const accountField = screen.getByTestId(TEST_ID_ACCOUNT.SELECT);
        const selectItem = screen.getByText(MOCK_ACCOUNT_TWO.name);

        expect(nameField.value).toBe(DEFAULT_TASK.name);
        expect(priceField.value).toBe(String(DEFAULT_TASK.price));
        expect(accountField.textContent).toBe(MOCK_ACCOUNT.name);
        expect(button.textContent).toBe(SAVE_TEXT);

        fireEvent.change(nameField, {target: {value: NAME}});
        fireEvent.change(priceField, {target: {value: PRICE}});
        fireEvent.click(selectItem);

        await act(async () => {
            fireEvent.click(button);
        });

        expect(handleClick).toHaveBeenCalledWith({
            bankAccount: MOCK_ACCOUNT_TWO.id,
            name: NAME,
            price: PRICE,
        });
    });

    test('Create task', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
                isOpen={true}
                onClose={() => {}}
                title={''}
                isFetching={false}
                isAccountsFetching={false}
                addAccount={() => {}}
                isEdit={false}
                onSubmit={handleClick}
            />
        );
        const accountField = screen.getByTestId(TEST_ID_ACCOUNT.SELECT);
        const selectItem = screen.getByText(MOCK_ACCOUNT_TWO.name);

        expect(nameField.value).toBe('');
        expect(priceField.value).toBe('0');
        expect(accountField.textContent).toBe('Выберите счет');
        expect(button.textContent).toBe(ADD_TASK_TEXT);

        fireEvent.change(nameField, {target: {value: NAME}});
        fireEvent.change(priceField, {target: {value: PRICE}});
        fireEvent.click(selectItem);

        await act(async () => {
            fireEvent.click(button);
        });

        expect(handleClick).toHaveBeenCalledWith({
            bankAccount: MOCK_ACCOUNT_TWO.id,
            name: NAME,
            price: PRICE,
        });
    });

    test('Check addAccount', async () => {
        const handleAddAccount = vi.fn();

        rerender(
            <TaskEditor
                accountsList={[]}
                isOpen={true}
                onClose={() => {}}
                title={''}
                isFetching={false}
                isAccountsFetching={false}
                addAccount={handleAddAccount}
                isEdit={false}
                onSubmit={() => {}}
            />
        );
        const item = screen.getByLabelText('Название счета') as HTMLInputElement;
        const selectItem = screen.getByText(ACCOUNT.text);
        const btn = screen.getByTestId(TEST_ID_ACCOUNT.ADD_ACCOUNT);
        const TEST_VALUE = generateWord(10);

        fireEvent.change(item, {target: {value: TEST_VALUE}});
        fireEvent.click(selectItem);

        await act(async () => {
            fireEvent.click(btn);
        });

        expect(handleAddAccount).toHaveBeenCalledWith({
            colorCode: ACCOUNT.value,
            name: TEST_VALUE,
        });
    });

    test('Check min task name', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
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
        const MIN_TASK_NAME = generateWord(TASK_MIN_LENGTH - 1);
        expect(nameField.value).toBe(DEFAULT_TASK.name);

        fireEvent.change(nameField, {target: {value: MIN_TASK_NAME}});

        await act(async () => {
            fireEvent.click(button);
        });
        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.NAME_MIN_LENGTH));
        });

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check max task name', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
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
        const MAX_TASK_NAME = generateWord(TASK_MAX_LENGTH + 1);

        fireEvent.change(nameField, {target: {value: MAX_TASK_NAME}});

        await act(async () => {
            fireEvent.click(button);
        });
        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.NAME_MAX_LENGTH));
        });

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check task name required', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
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

        fireEvent.change(nameField, {target: {value: ''}});

        await act(async () => {
            fireEvent.click(button);
        });
        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.NAME_REQUIRED));
        });

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check task price required', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
                isOpen={true}
                onClose={() => {}}
                title={''}
                isFetching={false}
                isAccountsFetching={false}
                addAccount={() => {}}
                isEdit={false}
                onSubmit={handleClick}
            />
        );
        fireEvent.change(nameField, {target: {value: 'Task Name'}});

        await act(async () => {
            fireEvent.click(button);
        });

        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.PRICE_REQUIRED));
        });

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check task price natural', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
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

        fireEvent.change(priceField, {target: {value: -10}});

        await act(async () => {
            fireEvent.click(button);
        });
        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.PRICE_NATURAL));
        });

        expect(handleClick).not.toHaveBeenCalled();
    });
    test('Check task price limit', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
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

        fireEvent.change(priceField, {target: {value: TASK_MAX_PRICE + 1}});

        await act(async () => {
            fireEvent.click(button);
        });
        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.PRICE_LIMIT));
        });

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check task price type number', async () => {
        const handleClick = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
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

        fireEvent.change(priceField, {target: {value: 'name'}});

        await act(async () => {
            fireEvent.click(button);
        });
        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.SUM_NUMBER));
        });

        expect(handleClick).not.toHaveBeenCalled();
    });

    test('Check bank account required', async () => {
        const handleSubmit = vi.fn();

        rerender(
            <TaskEditor
                accountsList={[]}
                isOpen={true}
                onClose={() => {}}
                title={''}
                isFetching={false}
                isAccountsFetching={false}
                addAccount={() => {}}
                isEdit={false}
                onSubmit={handleSubmit}
            />
        );

        fireEvent.change(nameField, {target: {value: NAME}});
        fireEvent.change(priceField, {target: {value: PRICE}});

        await act(async () => {
            fireEvent.click(button);
        });
        await waitFor(() => {
            expect(screen.getByText(TASK_ERROR.BANK_ACCOUNT));
        });

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('Check on close', async () => {
        const handleClose = vi.fn();

        rerender(
            <TaskEditor
                accountsList={MOCK_ACCOUNT_LIST}
                isOpen={true}
                onClose={handleClose}
                title={''}
                isFetching={false}
                isAccountsFetching={false}
                addAccount={() => {}}
                isEdit={false}
                onSubmit={() => {}}
            />
        );

        fireEvent.change(nameField, {target: {value: NAME}});
        fireEvent.change(priceField, {target: {value: PRICE}});

        await act(async () => {
            fireEvent.click(screen.getByText('Отменить'));
        });

        expect(nameField.value).toBe('');
        expect(priceField.value).toBe('0');

        expect(handleClose).toHaveBeenCalled();
    });
});
