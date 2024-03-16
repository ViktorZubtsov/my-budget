import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import {describe, expect, test, vi} from 'vitest';

import {ResizeObserver} from '@/helpers';
import {GOAL_EDITOR_SUBMIT_TEXT, GOAL_EDITOR_TITLE} from '@/modules/Goal/components/GoalEditor/constants';
import {GoalEditor} from '@/modules/Goal/components/GoalEditor/index';
import {GOAL_ERROR, GOAL_MIN_LENGTH} from '@/modules/Goal/constants';

const TEST_VALUE = 'TEST_VALUE';
const TEST_DESCR_VALUE = 'TEST_DESCR_VALUE';
const handleClick = vi.fn();
const handeClose = vi.fn();

const component = (
    <GoalEditor
        handeClose={handeClose}
        isFetch={false}
        isOpen={true}
        title={GOAL_EDITOR_TITLE}
        onSubmit={handleClick}
        submitText={GOAL_EDITOR_SUBMIT_TEXT}
    />
);

describe('GoalEditor', () => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;
    global.ResizeObserver = ResizeObserver;
    const {rerender} = render(component);
    const closeButton = screen.getByText('Отменить');
    const submitButton = screen.getByText(GOAL_EDITOR_SUBMIT_TEXT);
    const nameInput = screen.getByPlaceholderText('Название цели') as HTMLInputElement;
    const descInput = screen.getByPlaceholderText('Описание цели (Не обязательно)') as HTMLInputElement;

    test('Check success case', async () => {
        fireEvent.change(nameInput, {target: {value: TEST_VALUE}});
        fireEvent.change(descInput, {target: {value: TEST_DESCR_VALUE}});

        expect(nameInput.value).toBe(TEST_VALUE);

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(handleClick).toHaveBeenCalledWith({
            description: TEST_DESCR_VALUE,
            name: TEST_VALUE,
        });
    });

    test('Check empty  description', async () => {
        fireEvent.change(nameInput, {target: {value: TEST_VALUE}});

        expect(nameInput.value).toBe(TEST_VALUE);

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(handleClick).toHaveBeenCalledWith({
            description: '',
            name: TEST_VALUE,
        });
    });
    test('Check min name', async () => {
        const handleSubmit = vi.fn();
        rerender(
            <GoalEditor
                handeClose={handeClose}
                isFetch={false}
                isOpen={true}
                title={GOAL_EDITOR_TITLE}
                onSubmit={handleSubmit}
                submitText={GOAL_EDITOR_SUBMIT_TEXT}
            />
        );
        fireEvent.change(nameInput, {target: {value: '12'}});

        expect(nameInput.value).toBe('12');

        await act(async () => {
            fireEvent.click(submitButton);
        });
        // Проверяем, что отображаются сообщения об ошибках
        await waitFor(() => {
            expect(screen.getByText(GOAL_ERROR.GOAL_NAME_MIN_LENGTH));
        });
        expect(handleSubmit).not.toHaveBeenCalled();
    });
    test('Check max name, des', async () => {
        const handleSubmit = vi.fn();
        rerender(
            <GoalEditor
                handeClose={handeClose}
                isFetch={false}
                isOpen={true}
                title={GOAL_EDITOR_TITLE}
                onSubmit={handleSubmit}
                submitText={GOAL_EDITOR_SUBMIT_TEXT}
            />
        );
        fireEvent.change(nameInput, {target: {value: '12'}});

        expect(nameInput.value).toBe('12');

        await act(async () => {
            fireEvent.click(submitButton);
        });
        // Проверяем, что отображаются сообщения об ошибках
        await waitFor(() => {
            expect(screen.getByText(GOAL_ERROR.GOAL_NAME_MAX_LENGTH));
        });
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('Check close', () => {
        fireEvent.click(closeButton);
        expect(handeClose).toHaveBeenCalled();
    });
});
