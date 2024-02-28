import {IconVolumeOff, IconVolumeUp} from '@salutejs/plasma-icons';
import {Switch} from '@salutejs/plasma-ui';
import React, {ChangeEventHandler, memo, useEffect, useState} from 'react';

import {LOCAL_STORAGE_KEYS} from '@/constant';

import {CardStyled, Content, Title} from './styled';

interface ISoundSettingProps {
    isChecked: boolean;
}

export const SoundSetting = memo<ISoundSettingProps>(({isChecked = false}) => {
    const [checked, setChecked] = useState<boolean>(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleSwitch: ChangeEventHandler<HTMLInputElement> = (e) => {
        setChecked(e.target.checked);
        return localStorage.setItem(LOCAL_STORAGE_KEYS.VIBRATION, String(e.target.checked));
    };

    useEffect(() => {
        if (!Object.keys(localStorage).includes(LOCAL_STORAGE_KEYS.VIBRATION)) {
            setChecked(true);
            localStorage.setItem(LOCAL_STORAGE_KEYS.VIBRATION, String('true'));
        }
    }, []);
    return (
        <CardStyled p="10x">
            <Content>
                <Title>Вибрация {checked ? <IconVolumeUp size="s" color="inherit" /> : <IconVolumeOff size="s" color="inherit" />}</Title>

                <Switch id="sound-setting-switch" label="Вибрация на события" checked={checked} onChange={handleSwitch} />
            </Content>
        </CardStyled>
    );
});
