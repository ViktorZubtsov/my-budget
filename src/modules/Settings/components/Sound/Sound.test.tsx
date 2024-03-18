import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {TEST_ID_SOUND_SETTING} from '@/constant/dataTest';
import {ResizeObserver} from '@/helpers';
import {SoundSetting} from '@/modules/Settings/components/Sound/index';

const component = <SoundSetting isChecked={true} />;

describe('SoundSetting', () => {
    global.ResizeObserver = ResizeObserver;
    const {getByLabelText, getByTestId} = render(component);
    const switchItem = getByLabelText('Вибрация на события');

    test('Turn off the sound', () => {
        fireEvent.click(switchItem);

        expect(getByTestId(TEST_ID_SOUND_SETTING.SOUND_SETTING_OFF));
    });

    test('Turn On the sound', () => {
        fireEvent.click(switchItem);

        expect(getByTestId(TEST_ID_SOUND_SETTING.SOUND_SETTING_ON));
    });
});
