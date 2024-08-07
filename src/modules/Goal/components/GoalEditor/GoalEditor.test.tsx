import {fireEvent, render, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import {describe, expect, test, vi} from 'vitest';

import {generateWord, ResizeObserver} from '@/helpers';
import {GOAL_EDITOR_SUBMIT_TEXT, GOAL_EDITOR_TITLE} from '@/modules/Goal/components/GoalEditor/constants';
import {GoalEditor} from '@/modules/Goal/components/GoalEditor/index';
import {GOAL_ERROR, GOAL_MAX_LENGTH} from '@/modules/Goal/constants';

const TEST_VALUE = generateWord(10);
const TEST_MIN_VALUE = generateWord(2);
const TEST_PRE_MIN_VALUE = generateWord(3);
const TEST_MAX_VALUE = generateWord(GOAL_MAX_LENGTH + 1);
const TEST_DESCR_VALUE = generateWord(12);
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
    const {rerender, getByText, getByPlaceholderText} = render(component);
    const closeButton = getByText('Отменить');
    const submitButton = getByText(GOAL_EDITOR_SUBMIT_TEXT);
    const nameInput = getByPlaceholderText('Название цели') as HTMLInputElement;
    const descInput = getByPlaceholderText('Описание цели (Не обязательно)') as HTMLInputElement;

    test('Check success case', async () => {
        fireEvent.change(nameInput, {target: {value: TEST_VALUE}});
        fireEvent.change(descInput, {target: {value: TEST_DESCR_VALUE}});

        expect(nameInput.value).toBe(TEST_VALUE);
        expect(descInput.value).toBe(TEST_DESCR_VALUE);

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(handleClick).toHaveBeenCalledWith({
            description: TEST_DESCR_VALUE,
            name: TEST_VALUE,
        });
    });

    test('Check empty description', async () => {
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

    test('Check pre-min name value', async () => {
        fireEvent.change(nameInput, {target: {value: TEST_PRE_MIN_VALUE}});

        expect(nameInput.value).toBe(TEST_PRE_MIN_VALUE);

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(handleClick).toHaveBeenCalledWith({
            description: '',
            name: TEST_PRE_MIN_VALUE,
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
        fireEvent.change(nameInput, {target: {value: TEST_MIN_VALUE}});

        expect(nameInput.value).toBe(TEST_MIN_VALUE);

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(getByText(GOAL_ERROR.GOAL_NAME_MIN_LENGTH));
        });
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('Check max name', async () => {
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
        fireEvent.change(nameInput, {target: {value: TEST_MAX_VALUE}});

        expect(nameInput.value).toBe(TEST_MAX_VALUE);

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(getByText(GOAL_ERROR.GOAL_NAME_MAX_LENGTH));
        });
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('Check max desc', async () => {
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
        fireEvent.change(descInput, {target: {value: TEST_MAX_VALUE}});
        fireEvent.change(nameInput, {target: {value: TEST_VALUE}});

        expect(descInput.value).toBe(TEST_MAX_VALUE);
        expect(nameInput.value).toBe(TEST_VALUE);

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(getByText(GOAL_ERROR.GOAL_NAME_MAX_LENGTH));
        });
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('Check close', () => {
        fireEvent.click(closeButton);
        expect(handeClose).toHaveBeenCalled();
    });
});
