import {colors} from '@salutejs/plasma-tokens';

export const LOCAL_STORAGE_KEYS = {
    ACCOUNT_BADGE_WARNING: 'ACCOUNT_BADGE_WARNING',
    THEME: 'THEME',
    VIBRATION: 'VIBRATION',
};

export const ACCOUNTS_COLORS = {
    critical: colors.buttonCritical,
    dark: colors.dark03,
    green: colors.success,
    warning: colors.warning,
    whiteSecondary: colors.whiteSecondary,
    whiteTertiary: colors.whiteTertiary,
};

export const THEME = {
    DARK_EVA: 'DARK_EVA',
    DARK_JOY: 'DARK_JOY',
    DARK_SBER: 'DARK_SBER',
};
export const PROJECT_NAME = 'My Budget';

export const ERROR_TEXT = {
    REQUIRED: 'Поле обязательно для заполнения',
    MIN_LENGTH: (value: number) => `Поле должно содержать минимум ${value} символа`,
    MAX_LENGTH: (value: number) => `Поле должно содержать максимум ${value} символов`,
};
