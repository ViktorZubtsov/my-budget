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

    const handleSwitch: ChangeEventHandler<HTMLInputElement> = (e) => {
        setChecked(e.target.checked);
        return localStorage.setItem(LOCAL_STORAGE_KEYS.VIBRATION, String(e.target.checked));
    };

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    return (
        <CardStyled p="10x">
            <Content>
                <Title>
                    Вибрация{' '}
                    {checked ? (
                        <div data-testid={'soundSettingOn'}>
                            <IconVolumeUp size="s" color="inherit" />
                        </div>
                    ) : (
                        <div data-testid={'soundSettingOff'}>
                            <IconVolumeOff size="s" color="inherit" />
                        </div>
                    )}
                </Title>

                <Switch data-testid={'soundSettingSwitch'} label="Вибрация на события" checked={checked} onChange={handleSwitch} />
            </Content>
        </CardStyled>
    );
});
