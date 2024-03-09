import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {ResizeObserver} from '@/helpers';
import {SoundSetting} from '@/modules/Settings/components/Sound/index';

const component = <SoundSetting isChecked={true} />;

describe('SoundSetting', () => {
    global.ResizeObserver = ResizeObserver;
    render(component);
    const switchItem = screen.getByLabelText('Вибрация на события');

    test('Turn off the sound', () => {
        fireEvent.click(switchItem);

        expect(screen.getByTestId('soundSettingOff'));
    });

    test('Turn On the sound', () => {
        fireEvent.click(switchItem);

        expect(screen.getByTestId('soundSettingOn'));
    });
});
