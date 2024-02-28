import {Button, Radiobox, RadioGroup} from '@salutejs/plasma-ui';
import {memo, useState} from 'react';

import {LOCAL_STORAGE_KEYS, THEME} from '@/constant';

import {ThemeSettingContent, ThemeSettingStyled, ThemeSettingTitle} from './styled';

type TTheme = keyof typeof THEME;

interface IThemeSettingProps {
    handleApprove: () => void;
}

export const ThemeSetting = memo<IThemeSettingProps>(({handleApprove}) => {
    const [checked, setChecked] = useState<TTheme>((localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as TTheme) ?? THEME.DARK_SBER);

    const handleChange = (value: string) => {
        setChecked(value as TTheme);
    };
    const onApprove = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEME[checked]);
        handleApprove();
    };
    return (
        <ThemeSettingStyled p="10x">
            <ThemeSettingContent>
                <ThemeSettingTitle>Тема</ThemeSettingTitle>
                <RadioGroup aria-labelledby="radiogroup-title-id">
                    {Object.keys(THEME).map((key) => (
                        <Radiobox
                            key={key}
                            role={`radio-${key}`}
                            name="radio-1"
                            id={`theme-setting-${key}`}
                            label={key}
                            checked={checked === key}
                            onChange={() => handleChange(key)}
                        />
                    ))}
                </RadioGroup>
                <div>
                    <Button id="theme-setting-approve" onClick={onApprove}>
                        Применить
                    </Button>
                </div>
            </ThemeSettingContent>
        </ThemeSettingStyled>
    );
});
