import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';

import {THEME} from '@/constant';
import {TEST_ID_THEME} from '@/constant/dataTest';
import {ResizeObserver} from '@/helpers';
import {ThemeSetting} from '@/modules/Settings/components/Theme/index';

const handleClick = vi.fn();
const component = <ThemeSetting handleApprove={handleClick} />;

describe('ThemeSetting', () => {
    global.ResizeObserver = ResizeObserver;
    render(component);
    const itemJoy = screen.getByText(THEME.DARK_JOY);
    const itemEva = screen.getByText(THEME.DARK_EVA);
    const itemSber = screen.getByText(THEME.DARK_SBER);
    const subTitle = screen.getByTestId(TEST_ID_THEME.THEME_SETTING_SUB_TITLE);
    const button = screen.getByRole('button');
    const getSubTitle = (name: string) => `Выбранна тема: ${name}`;

    test('Chainge Joy theme', () => {
        fireEvent.click(itemJoy);
        fireEvent.click(button);

        expect(subTitle.textContent).toBe(getSubTitle(THEME.DARK_JOY));
        expect(handleClick).toHaveBeenCalled();
    });
    test('Chainge Eva theme', () => {
        fireEvent.click(itemEva);
        fireEvent.click(button);

        expect(subTitle.textContent).toBe(getSubTitle(THEME.DARK_EVA));
        expect(handleClick).toHaveBeenCalled();
    });
    test('Chainge Sber theme', () => {
        fireEvent.click(itemSber);
        fireEvent.click(button);

        expect(subTitle.textContent).toBe(getSubTitle(THEME.DARK_SBER));
        expect(handleClick).toHaveBeenCalled();
    });
});
